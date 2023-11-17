import pug from 'pug';
import path from 'path';

const root = path.resolve();

export function renderHeader() {
    const headerFilePath = path.join(root, 'src', 'views', 'partials','header.pug');
    const headerContent = pug.renderFile(headerFilePath);
    return headerContent;
}

export function renderFooter() {
    const footerFilePath = path.join(root, 'src', 'views', 'partials', 'footer.pug');
    const footerContent = pug.renderFile(footerFilePath);
    return footerContent;
}