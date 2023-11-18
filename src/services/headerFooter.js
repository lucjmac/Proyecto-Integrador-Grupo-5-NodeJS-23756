import pug from 'pug';
import path from 'path';

const root = path.resolve();

export function renderHeaderIndexShop() {
    const headerFilePath = path.join(root, 'src', 'views', 'partials','headerIndexShop.pug');
    const headerContent = pug.renderFile(headerFilePath);
    return headerContent;
}

export function renderFooterIndexShop() {
    const footerFilePath = path.join(root, 'src', 'views', 'partials', 'footerIndexShop.pug');
    const footerContent = pug.renderFile(footerFilePath);
    return footerContent;
}

export function renderHeaderAdmin() {
    const headerFilePath = path.join(root, 'src', 'views', 'partials','headerAdmin.pug');
    const headerContent = pug.renderFile(headerFilePath);
    return headerContent;
}

export function renderFooterAdmin() {
    const footerFilePath = path.join(root, 'src', 'views', 'partials', 'footerAdmin.pug');
    const footerContent = pug.renderFile(footerFilePath);
    return footerContent;
}