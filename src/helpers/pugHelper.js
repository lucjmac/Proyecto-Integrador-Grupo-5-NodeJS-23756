import pug from 'pug';
import path from 'path';

const partialsPath = path.resolve() + '/src/views/partials';

export const pugRender = (partial) => {
    const filePath = path.join(partialsPath, `${partial}.pug`);
    const content = pug.renderFile(filePath);
    return content;
};