const readFileChunks = (file, chunkSize, part) => {

    return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror=reject;
            const blob = file.slice(part * chunkSize, (part + 1) * chunkSize);

            reader.readAsArrayBuffer(blob);

        }
    )
}

export default readFileChunks