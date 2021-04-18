import * as React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors } from './Style';

const PATHS = {
    money: {
        viewBox: "0 0 24 24",
        d: "M11.8 10.9C9.53001 10.31 8.80001 9.7 8.80001 8.75C8.80001 7.66 9.81001 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06001 5.58 6.50001 6.84 6.50001 8.77C6.50001 11.08 8.41001 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44001 17.1 8.63001 16.18 8.52001 15H6.32001C6.44001 17.19 8.08001 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z" ,
    },
    phone: {
        viewBox: "0 0 18 18",
        d: "M12.25 1H6.25C5.005 1 4 2.005 4 3.25V15.25C4 16.495 5.005 17.5 6.25 17.5H12.25C13.495 17.5 14.5 16.495 14.5 15.25V3.25C14.5 2.005 13.495 1 12.25 1ZM10.75 16H7.75V15.25H10.75V16ZM13.1875 13.75H5.3125V3.25H13.1875V13.75Z",
    },
    confirm: {
        viewBox: "0 0 16 16",
        d: "M8.97788 3.33333L8.42478 2H4V13.3333H5.1062V8.66667H7.87168L8.42478 10H12.2965V3.33333H8.97788ZM11.1903 8.66667H8.97788L8.42478 7.33333H5.1062V3.33333H7.87168L8.42478 4.66667H11.1903V8.66667Z",
    },
    repair: {
        viewBox:"0 0 16 16",
        d: "M13.9075 11.6256L8.50574 6.2238C9.03998 4.85851 8.74318 3.25579 7.61533 2.12794C6.42813 0.940734 4.64732 0.703293 3.22267 1.35626L5.77516 3.90875L3.99435 5.68956L1.3825 3.13706C0.670178 4.56171 0.96698 6.34252 2.15419 7.52973C3.28203 8.65757 4.88476 8.95437 6.25005 8.42013L11.6518 13.8219C11.8893 14.0594 12.2454 14.0594 12.4829 13.8219L13.8482 12.4566C14.145 12.2192 14.145 11.8037 13.9075 11.6256Z",
    },
    complete: {
        viewBox:"0 0 16 16",
        d:"M6.0001 10.78L3.2201 8.00002L2.27344 8.94002L6.0001 12.6667L14.0001 4.66668L13.0601 3.72668L6.0001 10.78Z",
    },
    vehicle: {
        viewBox: "0 0 16 17",
        d: "M12.6133 3.67333C12.48 3.28 12.1067 3 11.6667 3H4.33333C3.89333 3 3.52667 3.28 3.38667 3.67333L2 7.66667V13C2 13.3667 2.3 13.6667 2.66667 13.6667H3.33333C3.7 13.6667 4 13.3667 4 13V12.3333H12V13C12 13.3667 12.3 13.6667 12.6667 13.6667H13.3333C13.7 13.6667 14 13.3667 14 13V7.66667L12.6133 3.67333ZM4.33333 10.3333C3.78 10.3333 3.33333 9.88667 3.33333 9.33333C3.33333 8.78 3.78 8.33333 4.33333 8.33333C4.88667 8.33333 5.33333 8.78 5.33333 9.33333C5.33333 9.88667 4.88667 10.3333 4.33333 10.3333ZM11.6667 10.3333C11.1133 10.3333 10.6667 9.88667 10.6667 9.33333C10.6667 8.78 11.1133 8.33333 11.6667 8.33333C12.22 8.33333 12.6667 8.78 12.6667 9.33333C12.6667 9.88667 12.22 10.3333 11.6667 10.3333ZM3.33333 7L4.33333 4H11.6667L12.6667 7H3.33333Z",
    },
    service: {
        viewBox: "0 0 18 18",
        d:"M3 3H15V4.5H3V3ZM3 5.25H15L15.75 9V10.5H15V15H13.5V10.5H10.5V15H3V10.5H2.25V9L3 5.25ZM4.5 10.5V13.5H9V10.5H4.5ZM13.77 6.75L14.22 9H3.78003L4.23003 6.75H13.77Z",
    },
    home: {
        viewBox: "0 0 24 24",
        d: "M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
    },
    account: {
        viewBox: "0 0 24 24",
        d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z",
    },


};

export const Icon = ({
    name = "money",
    color = colors.gray4,
    size = 16,
}) => {
    const item = PATHS[name];
    return (
    <Svg width={size} height={size} viewBox={item.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d={item.d} fill={color} />
    </Svg>
    );
};
