/* eslint-env es6 */
'use strict';

// External dependencies
import {src, dest} from 'gulp';
import pump from 'pump';
import requireUncached from 'require-uncached';

// Internal dependencies
import {rootPath, paths, gulpPlugins, gulpReplaceOptions} from './constants';

/**
 * JavaScript via Babel, ESlint, and uglify.
 */
export default function scripts(done) {
    // Get a fresh copy of the config
    const config = requireUncached(`${rootPath}/dev/config/themeConfig.js`);

	pump([
        src(paths.scripts.src),
        gulpPlugins.newer(paths.scripts.dest),
        gulpPlugins.eslint(),
        gulpPlugins.eslint.format(),
        gulpPlugins.babel(),
        dest(paths.verbose),
        gulpPlugins.if(
            !config.dev.debug.scripts, 
            gulpPlugins.uglify()
        ),
        gulpPlugins.stringReplace('wprig', config.theme.slug, gulpReplaceOptions),
        gulpPlugins.stringReplace('WP Rig', config.theme.name, gulpReplaceOptions),
        dest(paths.scripts.dest),
    ], done);
}