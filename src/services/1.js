import pug from 'pug';
import path from 'path';

const partialsPath = path.resolve() + '/src/views/partials';

export const renderPageIndexShop = () => {
    const headerFilePath = path.join(partialsPath, 'headerIndexShop.pug');
    const headerContent = pug.renderFile(headerFilePath);
    return headerContent;
}

export const renderFooterIndexShop = () => {
    const footerFilePath = path.join(partialsPath, 'footerIndexShop.pug');
    const footerContent = pug.renderFile(footerFilePath);
    return footerContent;
}

export const renderHeaderAdmin = () => {
    const headerFilePath = path.join(partialsPath, 'headerAdmin.pug');
    const headerContent = pug.renderFile(headerFilePath);
    return headerContent;
}

export const renderFooterAdmin =() => {
    const footerFilePath = path.join(partialsPath, 'footerAdmin.pug');
    const footerContent = pug.renderFile(footerFilePath);
    return footerContent;
}