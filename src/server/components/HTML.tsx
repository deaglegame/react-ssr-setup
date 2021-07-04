import * as React from 'react';

type Props = {
    children: any;
    css: string[];
    helmetContext: any;
    scripts: string[];
    state: string;
};

const HTML = ({
    children,
    css = [],
    scripts = [],
    state = '{}',
    helmetContext: { helmet },
}: Props) => (
    <html lang="">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" /><meta charset="utf-8" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Varela+Round&display=swap" rel="stylesheet" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
            {helmet.base.toComponent()}
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {helmet.script.toComponent()}
            {css.filter(Boolean).map((href) => (
                <link key={href} rel="stylesheet" href={href} />
            ))}
            <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    // TODO: Add jsesc/stringify here
                    // see: https://twitter.com/HenrikJoreteg/status/1143953338284703744
                    __html: `window.__PRELOADED_STATE__ = ${state}`,
                }}
            />
        </head>
        <body>
            {/* eslint-disable-next-line react/no-danger */}
            <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
            {scripts.filter(Boolean).map((src) => (
                <script key={src} src={src} />
            ))}
        </body>
    </html>
);

export default HTML;
