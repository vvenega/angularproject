// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  wsEndpoint:'ws://192.168.1.64:8208/rsocket',
  loginServiceWS:'http://192.168.1.64:8004',
  chatServiceWS:'http://192.168.1.64:8008',
  fileServiceWS:'http://192.168.1.64:8102',
  kafkaServiceWS:'http://192.168.1.64:8002',
  listingServiceWS:'http://192.168.1.64:8100',
  productRequestedWS:'http://192.168.1.64:8400'

  /*wsEndpoint:'ws:192.168.43.95/socket',
  loginServiceWS:'http://192.168.43.95:8004',
  chatServiceWS:'http://192.168.43.95:8008',
  fileServiceWS:'http://192.168.43.95:8102',
  kafkaServiceWS:'http://192.168.43.95:8002',
  listingServiceWS:'http://192.168.43.95:8100',
  productRequestedWS:'http://192.168.43.95:8400'*/

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
