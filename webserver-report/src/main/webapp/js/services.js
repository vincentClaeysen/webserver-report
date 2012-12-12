'use strict';

/* Services */
angular.module('reportApp.services', [])
// Declare application Service factory
.factory('applicationsService', ['$http', '$q', function ($http, $q) {

    // Create the application service
    function ApplicationService($http, $q) {
        this.retrieveApps = function () {
            console.log("retrieveApps");
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/MonitorConfig/applications',
            })
                .success(function (data, status, headers, config) {
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("error");
            });
            return deferred.promise;
        }

        this.retrievePhysicalServers = function (applicationName) {
            console.log("retrievePhysicalServers");
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/MonitorConfig/servers/' + applicationName,
            })
                .success(function (data, status, headers, config) {
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("error");
            });
            return deferred.promise;
        }

        this.retrieveASS = function (applicationName) {
            console.log("retrieveASS");
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/MonitorConfig/ass/' + applicationName,
            })
                .success(function (data, status, headers, config) {
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("error");
            });
            return deferred.promise;
        }

        this.retrieveQCFs = function (applicationName, server, as) {
            console.log("retrieveDataSources");
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/MonitorConfig/qcfs/' + applicationName + '/' + server + '/' + as
            })
                .success(function (data, status, headers, config) {
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("error");
            });
            return deferred.promise;
        }

        this.retrieveDataSources = function (applicationName, server, as) {
            console.log("retrieveDataSources");
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/MonitorConfig/dataSources/' + applicationName + '/' + server + '/' + as
            })
                .success(function (data, status, headers, config) {
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("error");
            });
            return deferred.promise;
        }

        this.getStats = function (applicationName) {
            console.log("applicationsService.getStats");
            //var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/MonitorConfig/stats/' + applicationName
            })
                .success(function (data, status, headers, config) {
                console.log("success");
                return data; //deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("error");
                return data;
            });
            // return deferred.promise;
        }

        this.batchInsert = function (applicationName, files) {
            console.log("applicationsService.batchInsert");
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/report/services/MonitorConfig/' + applicationName,
                data: files
            })
                .success(function (data, status, headers, config) {
                console.log("success");
                return deferred.resolve(data);

            })
                .error(function (data, status, headers, config) {
                console.log("error");
            });
            return deferred.promise;
        }

        this.purge = function (applicationName) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/MonitorConfig/purge/' + $scope.applicationName
            })
                .success(function (data, status, headers, config) {
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                return deferred.resolve(data);
            });
        }
    }
    // the Factory return an instance of the applicationService
    return new ApplicationService($http, $q);
}]).factory('schedulerService', ['$http', '$q', function ($http, $q) {

    // Create the application service
    function SchedulerService($http, $q) {

        this.listSchedulers = function (filter) {
            console.log("listScheduler service");
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/schedulers'
            })
                .success(function (data, status, headers, config) {
                console.log("success");
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("error");
                return deferred.resolve(data);
            });
            return deferred.promise;
        }

        this.findSchedulerById = function (schedulerId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/schedulers/' + schedulerId
            })
                .success(function (data, status, headers, config) {
                console.log("SUCCESS SchedulerService - findSchedulerById()");
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("ERROR SchedulerService - findSchedulerById()");
                return deferred.resolve(data);;
            });
            return deferred.promise;
        }

        this.updateScheduler = function (scheduler) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/report/services/schedulers/' + scheduler.schedulerId,
                data: scheduler
            })
                .success(function (data, status, headers, config) {
                console.log("SUCCESS SchedulerService - updateScheduler()");
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("ERROR SchedulerService - updateScheduler()");
                return deferred.resolve(data);
            });
            return deferred.promise;
        }

        this.deleteScheduler = function (schedulerId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/report/services/schedulers/delete/' + schedulerId
            })
                .success(function (data, status, headers, config) {
                console.log("SUCCESS SchedulerService - deleteScheduler()");
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("ERROR SchedulerService - deleteScheduler()");
                return deferred.resolve(data);
            });
            return deferred.promise;
        }


        this.addScheduler = function (scheduler) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/report/services/schedulers',
                data: scheduler
            })
                .success(function (data, status, headers, config) {
                console.log("SUCCESS SchedulerService - addScheduler()");
                return deferred.resolve(data);
            })
                .error(function (data, status, headers, config) {
                console.log("ERROR SchedulerService - addScheduler()");
                return deferred.resolve(data);
            });
            return deferred.promise;
        }

        this.changeStatus = function(scheduler) {
             var action ='';
             if (scheduler.state == 'running'){
                    action = 'stop';
             }else{
                    action = 'start';
             }
             var deferred = $q.defer();
             $http({
                  method: 'GET',
                  url: '/report/services/schedulers/'+action+'/'+scheduler.schedulerId,
                  data: scheduler
             })
                  .success(function (data, status, headers, config) {
                  console.log("SUCCESS SchedulerService - changeStatus("+action+")");
                  return deferred.resolve(data);
             })
                   .error(function (data, status, headers, config) {
                   console.log("ERROR SchedulerService - changeStatus("+action+")");
                   return deferred.resolve(data);
             });
             return deferred.promise;
        }
    }
    // return instance of Scheduler service
    return new SchedulerService($http, $q);
}]).
value('version', '1.0.0');