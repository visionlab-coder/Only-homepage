export const exportToCsv = (filename: string, rows: object[]) => {
    if (!rows || !rows.length) {
        return;
    }

    const separator = ',';
    const keys = Object.keys(rows[0]);

    // CSV Header
    const csvContent =
        keys.join(separator) +
        '\n' +
        rows.map(row => {
            return keys.map(k => {
                const value: any = row[k as keyof typeof row];
                let cell: string;
                if (value === null || value === undefined) {
                    cell = '';
                } else if (value instanceof Date) {
                    cell = value.toLocaleString();
                } else {
                    cell = String(value);
                }
                cell = cell.replace(/"/g, '""');
                if (cell.search(/(",|\n)/g) >= 0) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(separator);
        }).join('\n');

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); // BOM for Excel
    const link = document.createElement('a');
    if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
