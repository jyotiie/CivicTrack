/**
 * Created by Angad on 7th February 2023
 */

'use strict';

require('./health');
require('./auth');
require("./civicReport");
app.use(process.env.PATH_ALIAS || '/', router);