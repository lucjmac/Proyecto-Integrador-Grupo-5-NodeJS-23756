import ejs from 'ejs';
import path from 'path';

const partialsPath = path.resolve() + '/src/views/partials';

export const ejsRender = (partial) => {
    const filePath = path.join(partialsPath, `${partial}.ejs`);
    const content = ejs.renderFile(filePath);
    return content;
};
