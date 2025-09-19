import { CONFIG } from 'src/config-global';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Error: 404 La página no fue encontrada! | Error - ${CONFIG.appName}`}</title>

      <NotFoundView />
    </>
  );
}
