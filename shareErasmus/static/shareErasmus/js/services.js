app.service('shareErasmusApi', ['$http','$cookies',  function($http, $cookies) {

    var COUNTRIES_PATH = "/api/1.0/countries/";
    var CITIES_PATH = "/api/1.0/cities/";
    var UNIVERSITIES_PATH = "/api/1.0/universities/";
    var SUBJECTS_PATH = "/api/1.0/subjects/";
    var USERS_PATH = "/api/1.0/users/";
    var COMMENTS_PATH = "/api/1.0/comments/";
    var SESSION_PATH = "/api/1.0/session/";

    var X_CSRF_TOKEN_HEADER_NAME = "X-CSRFToken";
    var COOKIE_HEADER_NAME = "Cookie";

    var config = {
        headers:  {
            'Accept-Language': 'es',
            'Content-Type': 'application/json'
        }
    };

    var urlEncode = function(obj) {
        var str = [];
        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    var defaultHeaders = function() {
        var csrftoken = $cookies.get("csrftoken") || "";

        var xHeaders = config.headers;
        xHeaders[X_CSRF_TOKEN_HEADER_NAME] = csrftoken;
        return xHeaders;
    };

    var _http = function(method, url, query_params, data, headers, transformRequest) {
        query_params = query_params || null;
        data = data || null;
        headers = headers || defaultHeaders();
        transformRequest = transformRequest || null;

        if (transformRequest != null)
            var req = {
                method: method,
                url: url,
                headers: headers,
                params: query_params,
                data: data,
                transformRequest: transformRequest
            };
        else
            var req = {
                method: method,
                url: url,
                headers: headers,
                params: query_params,
                data: data
            };

        return $http(req);
    };

    this.getCountries = function() {
        return _http("GET", COUNTRIES_PATH);
    };

    this.getCities = function() {
        return _http("GET", CITIES_PATH);
    };

    this.getCity = function(cityId) {
        return _http("GET", CITIES_PATH + cityId + "/");
    };

    this.getUniversities = function() {
        return _http("GET", UNIVERSITIES_PATH);
    };

    this.getUniversity = function(universityId) {
        return _http("GET", UNIVERSITIES_PATH + universityId + "/");
    };

    this.getUniversityFilter = function(city) {
        city = city || null;
        var query_params = {
            'city': city
        };
        return _http("GET", UNIVERSITIES_PATH, query_params);
    };

    this.getSubjects = function() {
        return _http("GET", SUBJECTS_PATH);
    };

    this.getSubject = function(subjectId) {
        return _http("GET", SUBJECTS_PATH + subjectId + "/");
    };

    this.getUsers = function() {
        return _http("GET", USERS_PATH);
    };

    this.getUser = function(userId) {
        return _http("GET", USERS_PATH + userId + "/");
    };

    this.getComments = function() {
        return _http("GET", COMMENTS_PATH);
    };

    this.getSession = function() {
        return _http("GET", SESSION_PATH);
    };

    this.createCountry = function(name) {
        name = name || "";

        var form_params = {
            'name': name
        };
        return _http("POST", COUNTRIES_PATH, null, form_params);
    };

    this.createCity = function(name, country) {
        name = name || "";
        country = country || null;

        var form_params = {
            'name': name,
            'country': country
        };
        return _http("POST", CITIES_PATH, null, form_params);
    };

    this.updateInfoCity = function(cityId, infoCity) {
        infoCity = infoCity || null;

        var form_params = {
            'infoCity': infoCity
        };
        return _http("PATCH", CITIES_PATH + cityId + "/", null, form_params);
    };

    this.createUniversity = function(name, city) {
        name = name || "";
        city = city || null;

        var form_params = {
            'name': name,
            'city': city
        };
        return _http("POST", UNIVERSITIES_PATH, null, form_params);
    };

    this.updateInfoUniversity = function(universityId, description, contacts) {
        description = description || "";
        contacts = contacts || "";

        var form_params = {
            'description': description,
            'contacts': contacts
        };
        return _http("PATCH", UNIVERSITIES_PATH + universityId + "/", null, form_params);
    };

    this.createUser = function(email, username, password) {
        email = email || null;
        username = username || null;
        password = password || null;

        var form_params = {
            'email': email,
            'username': username,
            'password': password
        };
        return _http("POST", USERS_PATH, null, form_params);
    };

    this.updateUser = function(userId, username, email, firstName, lastName, isPublicEmail, password) {
        var form_params = {
            'username': username,
            'email': email,
            'first_name': firstName,
            'last_name': lastName,
            'is_public_email': isPublicEmail,
            'password': password
        };
        return _http("PUT", USERS_PATH + userId + "/", null, form_params);
    };

    this.changePassword = function(userId, currentPassword, newPassword) {
        currentPassword = currentPassword || "";
        newPassword = newPassword || "";

        var form_params = {
            'currentPassword': currentPassword,
            'newPassword': newPassword
        };
        return _http("PATCH", USERS_PATH + userId + "/", null, form_params);
    };

    this.authenticate = function(username, password) {
        var form_params = {
            'username': username,
            'password': password
        };
        return _http("POST", SESSION_PATH, null, form_params);
    };

    this.addSubjectsToUser = function(userId, subjects) {
        subjects = subjects || null;

        var form_params = {
            'subjects': subjects
        };
        return _http("PATCH", USERS_PATH + userId + "/", null, form_params);
    };

    this.loadCities = function(cities, country) {
        var filterCities = [];
        for (var i=0; i<cities.length; i++) {
            if (!~filterCities.indexOf(cities[i]) && cities[i].country.pk == country) {
                filterCities.push(cities[i]);
            }
        }
        return filterCities;
    };

    this.loadUniversities = function(universities, city) {
        var filterUniversities = [];
        for (var i=0; i<universities.length; i++) {
            if (!~filterUniversities.indexOf(universities[i]) && universities[i].city.pk == city) {
                filterUniversities.push(universities[i]);
            }
        }
        return filterUniversities;
    };

    this.createSubjects = function(names, university, user) {
        names = names || null;
        university = university || null;
        user = user || null;

        var form_params = {
            'names': names,
            'university': university,
            'user': user
        };
        return _http("POST", SUBJECTS_PATH, null, form_params);
    };

    this.updateInfoSubject = function(subjectId, description, validationSubjects, creditsEcts) {
        description = description || "";
        validationSubjects = validationSubjects || "";
        creditsEcts = creditsEcts || null;

        var form_params = {
            'description': description,
            'validationSubjects': validationSubjects,
            'creditsEcts': creditsEcts
        };
        return _http("PATCH", SUBJECTS_PATH + subjectId + "/", null, form_params);
    };

    this.createComment = function(userId, body, universityId, subjectId) {
        userId = userId || null;
        body = body || "";
        universityId = universityId || null;
        subjectId = subjectId || null;

        var form_params = {
            'userId': userId,
            'body': body,
            'universityId': universityId,
            'subjectId': subjectId
        };
        return _http("POST", COMMENTS_PATH, null, form_params);
    };

    this.getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


}]);