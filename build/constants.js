'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var AGE_GROUPS_CASES = exports.AGE_GROUPS_CASES = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+', 'Age unknown'];
var AGE_GROUPS_MORTALITY = exports.AGE_GROUPS_MORTALITY = ['0-24', '25-44', '45-64', '65-74', '75-84', '85+', 'Age unknown'];
var AGE_GROUPS_VACCINATION = exports.AGE_GROUPS_VACCINATION = ['0-17', '18-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+', 'Age unknown'];
var MONGO_URI = exports.MONGO_URI = 'mongodb+srv://Zinston:' +
// eslint-disable-next-line no-undef
process.env.MONGO_PASSWORD + '@belcovidcluster.pz4dd.mongodb.net/belcovid?retryWrites=true&w=majority';
var PROVINCES = exports.PROVINCES = {
    be: 'Belgium',
    ant: 'Antwerpen',
    ovl: 'OostVlaanderen',
    vbr: 'VlaamsBrabant',
    lim: 'Limburg',
    wvl: 'WestVlaanderen',
    hnt: 'Hainaut',
    lge: 'Liège',
    lux: 'Luxembourg',
    nam: 'Namur',
    brw: 'BrabantWallon',
    bxl: 'Brussels'
};
var PROVINCE_KEYS = exports.PROVINCE_KEYS = Object.keys(PROVINCES).reduce(function (obj, key) {
    obj[PROVINCES[key]] = key;
    return obj;
}, {});
var URLS = exports.URLS = {
    hospitalizations: 'https://epistat.sciensano.be/Data/COVID19BE_HOSP.json',
    tests: 'https://epistat.sciensano.be/Data/COVID19BE_tests.json',
    cases: 'https://epistat.sciensano.be/Data/COVID19BE_CASES_AGESEX.json',
    mortality: 'https://epistat.sciensano.be/Data/COVID19BE_MORT.json',
    vaccination: 'https://epistat.sciensano.be/Data/COVID19BE_VACC.json'
};
//# sourceMappingURL=constants.js.map