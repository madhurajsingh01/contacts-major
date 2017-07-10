var app = angular.module('myapp', ['ngRoute', 'ngMessages']);
app.constant('API_PREFIX','https://zenways-contact.herokuapp.com/api/');
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/register.html',
        controller: 'register'
    }).when('/editcontact/:contact_id', {
        templateUrl: 'views/register.html',
        controller: 'register'
    }).when('/registration', {
        templateUrl: 'views/register.html',
        controller: 'register'
    }).when('/contacts', {
        templateUrl: 'views/showContacts.html',
        controller: 'contacts'
    }).when('/contactcards', {
        templateUrl: 'views/contactCards.html',
        controller: 'contactcards'
    }).when('/searchcontact', {
        templateUrl: 'views/searchContact.html',
        controller: 'searchcontact'
    }).when('/contacts/:contact_id', {
        templateUrl: 'views/showContactDetails.html',
        controller: 'contactDetails'
    }).when('/editcontact/:contact_id', {
        templateUrl: 'views/register.html',
        controller: 'register'
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});


app.run(function ($rootScope) {
    $rootScope.showLoader = function () {
        $("#waitScreen").show();
    }
    $rootScope.hideLoader = function () {
        $("#waitScreen").hide();
    }
    
})

/////////////////////////////////////////////////


//          Add new contact


/////////////////////////////////////////////////
app.controller('register', function ($rootScope, $location, $scope, $q, $http, $routeParams,API_PREFIX) {
    $scope.test=function(){
        $rootScope.$emit('m','hello');
    }
    
    /*Function for adding new contact*/
    $scope.btn = 1;
    if ($routeParams.contact_id) {
         $scope.btn = 2;
        $http({
            url: API_PREFIX+'contact/' + $routeParams.contact_id,
            method: 'GET',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            }
        }).then(function (response) {
            console.log(response.data);
            $scope.contact = response.data.contact;
            
            $rootScope.hideLoader();
           

            //$location.path('/contacts/contact');
        }, function (resposne) {
            console.log("Save Failed" + response);
            $rootScope.hideLoader();
        });
    }
    
    $scope.submitForm = function () {

        $http({
            url: API_PREFIX+'contact',
            method: $routeParams.contact_id ? 'PUT' : 'POST',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            },
            data: $scope.contact
        }).then(function (response) {
            console.log(response);
            $scope.contact.name = '';
            $scope.contact.email = '';
            $scope.contact.phno = '';
            $scope.contact.address = '';
        }, function (resposne) {
            console.log("Save Failed" + response);
        })

        /*  
          $rootScope.contacts.push(angular.copy($scope.contact));*/
        $location.path('/contacts');
    }



    $scope.update = function (contact) {
//        console.log(contact._id);
//        var id = contact._id;
//        $rootScope.showLoader();
//        $http({
//            url: 'https://zenways-contact.herokuapp.com/api/contact/' + id,
//            method: 'PUT',
//            headers: {
//                'key': 'ZENWAYS01MADHURAJ'
//            },
//            data: contact
//        }).then(function (response) {
//            console.log(response);
//            $scope.contact.name = '';
//            $scope.contact.email = '';
//            $scope.contact.phno = '';
//            $scope.contact.address = '';
//            $rootScope.hideLoader();
//        }, function (resposne) {
//            console.log("update Failed" + response);
//            $rootScope.hideLoader();
//        })

        /*  
          $rootScope.contacts.push(angular.copy($scope.contact));*/
        $location.path('/contacts');
    }

});


/////////////////////////////////////////////////


//          Display and Manage All Contacts


/////////////////////////////////////////////////



/*Controller for displayy all contacts, perform Delete, Edit and View operations*/
app.controller('contacts', function ($scope, $rootScope, $location, $q, $http) {
    /*Function for DISPLAY all contacts */
    $rootScope.$on('m',function(event,data){
        console.log('m was called',event,data)
    })
    $scope.showPage=function(page){
        $scope.activePage=page;
        $scope.viewableContacts=$scope.registrations.slice(page*5,page*5+5);
    }
    $scope.loadContacts = function () {
        $rootScope.showLoader();
        $http({
            method: 'GET',
            url: 'https://zenways-contact.herokuapp.com/api/contacts',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            }
        }).then(function (response) {
            $rootScope.hideLoader();
            $scope.state = 1;
            $scope.registrations = response.data.contacts;
            var noOfPages=parseInt($scope.registrations.length/5)+1;
            $scope.pages=function(){
                var arr=[];
                for(let i=0;i<noOfPages;i++)arr.push(i);
                return arr;
            }
            $scope.showPage(0);
        }, function (response) {
            $scope.error = response;
            $rootScope.hideLoader();
            console.log("Failure response :" + response);
        });
    }
    
    $scope.loadContacts();

    /*Function for DELETE a record*/
    $scope.removeRow = function (contact) {
        if (confirm("Are you sure to delete " + contact.name + " !!") == true) {
            console.log(contact._id);
            var id = contact._id;
            $rootScope.showLoader();
            $http({
                url: 'https://zenways-contact.herokuapp.com/api/contact/' + id,
                method: 'DELETE',
                headers: {
                    'key': 'ZENWAYS01MADHURAJ'
                }
            }).then(function (response) {
                $scope.loadContacts();
                console.log(response);
                $rootScope.hideLoader();
            }, function (resposne) {
                $rootScope.hideLoader();
                console.log("Save Failed" + response);
            })

        }
    }

    /*Filling the values in input boxes to Edit the perticular contact*/
    $scope.editRow = function (contact) {
        /*console.log($routeParams.contact_id);
//        var id = $routeParams.contact_id;*/
//        var id = contact._id;
//        $rootScope.showLoader();
//        $http({
//            url: 'https://zenways-contact.herokuapp.com/api/contact/' + id,
//            method: 'GET',
//            headers: {
//                'key': 'ZENWAYS01MADHURAJ'
//            }
//        }).then(function (response) {
//            $rootScope.contact = response.data.contact;
//            $rootScope.btn = 2;
//            $rootScope.hideLoader();
//        }, function (resposne) {
//            console.log("Failed" + response);
//            $rootScope.hideLoader();
//        })
        $location.path('/editcontact/'+contact._id);
    }

    $scope.details = function (contact) {
        $location.path('/contacts/contact._id');
    }

});

/////////////////////////////////////////////////


//          Display specific contacts details


/////////////////////////////////////////////////

app.controller('contactDetails', function ($scope, $rootScope, $http, $routeParams, GMap) {
    //    $scope.contact = $rootScope.contacts.filter(function (element) {
    //        return element.name == $routeParams.contact;
    //    })[0];

    $scope.smssent = false;
    $scope.emailsent = false;

    var id = $routeParams.contact_id;
    $rootScope.showLoader();
    $http({
        url: 'https://zenways-contact.herokuapp.com/api/contact/' + id,
        method: 'GET',
        headers: {
            'key': 'ZENWAYS01MADHURAJ'
        }
    }).then(function (response) {
        console.log(response.data.contact);
        $scope.contact = response.data.contact;
        GMap.initMap($scope.contact.address, 'map')
        $rootScope.hideLoader();

        //$location.path('/contacts/contact');
    }, function (resposne) {
        console.log("Save Failed" + response);
        $rootScope.hideLoader();
    });

    $scope.sendEmail = function (email, contact) {
        console.log(email.subject + ' ' + contact.email + ' ' + email.text);
        $http({
            url: 'https://zenways-contact.herokuapp.com/api/secure_email',
            method: 'POST',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            },
            data: {
                "subject": email.subject,
                "to": contact.email,
                "text": email.text
            }
        }).then(function (response) {
            console.log(response.data);
            $scope.emailsent = true;
            $scope.email.subject = '';
            $scope.email.text = '';

        }, function (response) {
            console.log("Save Failed" + response);
            $scope.emailsent = false;
        });
    }


    $scope.sendSMS = function (sms, contact) {
        $scope.smssent = false;
        console.log(sms.text + ' ' + contact.phno);
        var accountSid = 'ACe84afa19de5642925acdc46e75f00d7d';
        var authToken = '67bacc40c727b3316d317de0551f2a93';
        var mobile = "+91" + contact.phno;
        console.log(JSON.stringify('https://'+accountSid+":"+authToken+'@api.twilio.com/2010-04-01/Accounts/ACe84afa19de5642925acdc46e75f00d7d/Messages.json'));
        $http({
            method: 'POST',
            url: 'https://'+accountSid+":"+authToken+'@api.twilio.com/2010-04-01/Accounts/ACe84afa19de5642925acdc46e75f00d7d/Messages.json',
            data: {
                "To": mobile,
                "From": "+14156505824",
                "Body": sms.text
            },
            /*   contentType: 'application/x-www-form-urlencoded',
                 beforeSend: function (xhr) {
                                        xhr.setRequestHeader("Authorization", "Basic " + btoa(authId + ":" + authPass));
                                }*/
            /*transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },*/
            headers: {
                
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(function (response) {
            console.log(response.data);
            $scope.smssent = true;
            $scope.sms.text = '';

        }, function (response) {
            console.log("Save Failed" + response.data);
            $scope.smssent = false;
        });
    }
});


/////////////////////////////////////////////////


//          Diplay contacts in cards


/////////////////////////////////////////////////




/*Controller for displayy all contacts, perform Delete, Edit and View operations*/
app.controller('contactcards', function ($scope, $rootScope, $location, $q, $http) {
    /*Function for DISPLAY all contacts */

    $scope.loadContacts = function () {
        $rootScope.showLoader();
        $http({
            method: 'GET',
            url: 'https://zenways-contact.herokuapp.com/api/contacts',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            }
        }).then(function (response) {
            $scope.state = 1;
            $scope.registrations = response.data.contacts;
            $rootScope.hideLoader();
        }, function (response) {
            $scope.error = response;
            console.log("Failure response :" + response);
            $rootScope.hideLoader();
        });
    }
    $scope.loadContacts();

    /*Function for DELETE a record*/
    $scope.removeRow = function (contact) {
        console.log(contact._id);
        var id = contact._id;
        $rootScope.showLoader();
        $http({
            url: 'https://zenways-contact.herokuapp.com/api/contact/' + id,
            method: 'DELETE',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            }
        }).then(function (response) {
            $scope.loadContacts();
            console.log(response);
            $rootScope.hideLoader();
        }, function (resposne) {
            console.log("Save Failed" + response);
            $rootScope.hideLoader();
        })
    }

    /*Filling the values in input boxes to Edit the perticular contact*/
    $scope.editRow = function (contact) {
        /*console.log($routeParams.contact_id);
        var id = $routeParams.contact_id;*/
        var id = contact._id;
        $rootScope.showLoader();
        $http({
            url: 'https://zenways-contact.herokuapp.com/api/contact/' + id,
            method: 'GET',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            }
        }).then(function (response) {
            $rootScope.contact = response.data.contact;
            $rootScope.btn = 2;
            $rootScope.hideLoader();
        }, function (resposne) {
            console.log("Failed" + response);
            $rootScope.hideLoader();
        })
        $location.path('/');
    }

    $scope.details = function (contact) {
        $location.path('/contacts/contact._id');
    }

});



/////////////////////////////////////////////////


//          Search specific contact


/////////////////////////////////////////////////





app.controller('searchcontact', function ($scope, $rootScope, $http, $routeParams) {

    $scope.search = function () {
        $http({
            method: 'GET',
            url: 'https://zenways-contact.herokuapp.com/api/contacts',
            headers: {
                'key': 'ZENWAYS01MADHURAJ'
            }
        }).then(function (response) {
            $scope.state = 1;
            $scope.registrations = response.data.contacts;
           
        }, function (response) {
            console.log("Failure response :" + response);
        });
    }
    //$scope.search();


});
