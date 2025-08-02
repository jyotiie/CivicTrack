/**
 * Created by Angad on 7th February 2023
 */

'use strict';

require('./health');
require('./onboard');
require('./app_versions');

app.use(process.env.PATH_ALIAS || '/', router);