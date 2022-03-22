import React from 'react'
import { Button } from 'antd';
import { storage } from "../../firebase/config"
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
export default function TestUpload() {

    const [image, setImage] = React.useState();
    const [getUrlErr, setGetUrlErr] = React.useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpLoad = (e) => {
        const nameIMG = Math.floor(Math.random() * 100000000000000);

        const storageRef = ref(storage, `files/${nameIMG}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => { setGetUrlErr(`files/${nameIMG}`) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    storageRef(`files/${nameIMG}`)
                });
            }
        );

    }

    React.useEffect(() => {
        if (getUrlErr !== "") {
            const storageRef = ref(storage, getUrlErr);
            getDownloadURL(storageRef).then((downloadURL) => {
                console.log(downloadURL)
            });
        }
        return () => {
            setGetUrlErr("")
        }
    }, [getUrlErr])


    return (
        <div>
            <input type="file" onChange={handleChange} />
            <Button
                onClick={handleUpLoad}
                type="dashed" danger
            >

            </Button>


        </div>
    )
}
