/* @flow */

import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import HTML from './templates/HTML';
import App from './templates/App';
import type { Metadata, PageInfo, Separator } from './types';

type Options = {
  data: Array<Metadata | Separator>,
  info: PageInfo,
  github?: string,
  logo?: string,
  sheets: string[],
  scripts: string[],
};

export default function buildHTML({
  data,
  info,
  github,
  logo,
  sheets,
  scripts,
}: Options) {
  const html = ReactDOMServer.renderToString(
    <App logo={logo} path={info.link} data={data} github={github} />
  );

  let body = `<div id='root'>${html}</div>`;

  body += `
    <script>
      window.__INITIAL_PATH__ = '${info.link}';
    </script>
  `;

  body += '<script src="app.bundle.js"></script>';

  scripts.forEach(s => {
    body += `<script src="${s}"></script>`;
  });

  return ReactDOMServer.renderToStaticMarkup(
    // eslint-disable-next-line react/jsx-pascal-case
    <HTML
      title={info.title}
      description={(info.description || '').split('\n')[0]}
      body={body}
      sheets={sheets}
    />
  );
}
