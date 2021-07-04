import { css, createGlobalStyle } from 'styled-components';
import { ThemeType } from './Themes';

interface Props {
    theme: ThemeType
};

export const GlobalStyles = createGlobalStyle(
    (props: Props) => css`
        body {
            background: ${props.theme.body};
            color: ${props.theme.text};
            font-family: ${props.theme.fonts.openSans};
            transition: all 0.10s linear;

            a {
                color: ${props.theme.text};

                &:hover {
                    color: ${props.theme.light};
                }
            }

            h1, h2, h3 {
                font-size: 1.4rem;
                font-family: ${props.theme.fonts.varela};
                font-weight: normal;
            }

            h3 {
                font-size: 1.2rem;
            }
        }
        
        .bullish {
            color: ${props.theme.bullish};
        }
            
        .bearish {
            color: ${props.theme.bearish};
        }
    `
);