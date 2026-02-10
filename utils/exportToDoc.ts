export const exportToDoc = (filename: string, elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>${filename}</title>
            <style>
                body { font-family: 'Malgun Gothic', sans-serif; }
                h1 { font-size: 24px; color: #333; }
                h2 { font-size: 20px; color: #0056b3; margin-top: 20px; }
                h3 { font-size: 16px; color: #555; }
                p { font-size: 14px; line-height: 1.6; }
                ul { margin-bottom: 20px; }
                li { margin-bottom: 10px; }
                .highlight { background-color: #f0f9ff; padding: 10px; border-radius: 5px; }
            </style>
        </head>
        <body>
            ${element.innerHTML}
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
