import React, { useState, useEffect } from 'react';

function Folders() {
    const [folders, setFolders] = useState({});

    useEffect(() => {
        async function main() {
            const folderList = await electronAPI.getFolders.fetchFolders();
            return folderList;
        }
        main()
            .then((f) => setFolders(f))
            .catch((err) => {
                console.log(err);
            })

    }, []);

    const folderName = (filepath) => {
        const parts = filepath.split(/[/\\]/);
        const lastPart = parts.pop();
        return lastPart;
    };
    
    return (
        <div>
            {
                Object.keys(folders).map((key, index) => (
                    <div key={index}>{folderName(key)}</div>
                ))
            }
        </div>
    )
}

export default Folders;