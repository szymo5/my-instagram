import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import {Stack, Typography, Box, Avatar } from "@mui/material";
import ImageCropDialog from "./ImageCrop";

import getCroppedImg from "../utils/cropImage";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Create = ({setIsCreate, user}) => {
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [describe, setDescribe] = useState('');
    const [image, setImage] = useState({id: false, imageUrl: false, croppedImage: false});
    const [dragActive, setDragActive] = useState(false);

    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log(e.dataTransfer.files)
            // setImage({imageUrl: e.dataTransfer.files[0].name});
            const reader = new FileReader();
			reader.readAsDataURL(e.dataTransfer.files[0]);
			reader.addEventListener("load", () => {
				setImage({...image, imageUrl: reader.result});
			});
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        // if (e.target.files && e.target.files[0]) {
        //     console.log(e.target.files)
        //     setImage({imageUrl: e.target.files[0].name});
        // }
        if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.addEventListener("load", () => {
				setImage({...image, imageUrl: reader.result});
			});
		}
    };

    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(image.imageUrl, croppedAreaPixels);
        setImage({...image, croppedImage: croppedImageUrl});
        console.log(croppedImageUrl)
    };

    const onButtonClick = () => {
        inputRef.current.click();
    }

    const closeCreate = (e) => {
        if(e.target?.className?.includes("main")){
            setIsCreate(false);
            setImage(false);
        }
    }

    const closeCreateForButton = () => {
        setIsCreate(false);
        setImage(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }



    return ( 
        <Stack className="main" justifyContent="center" alignItems="center" sx={{width: '100%', height: '100%', background: 'rgb(0,0,0,0.7)', position: 'absolute', top: '0', left: '0', zIndex: '1'}} onClick={closeCreate} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            <Stack width={image.croppedImage ? '55%' : '38%'} height="80%" sx={{background: 'rgb(38,38,38)', borderRadius: '12px'}}>
                <Stack direction="row" justifyContent='center' sx={{color: 'rgb(250,250,250)', textAlign: 'center', p:'8px', borderBottom: '1px solid rgb(54,54,54)', fontWeight: '500'}}>
                    <Stack direction="row" alignItems='center' justifyContent={image.imageUrl ? 'space-between' : 'center'} sx={{width: '95%'}}>
                        {image.imageUrl && <KeyboardBackspaceIcon sx={{cursor: 'pointer', fontSize: '30px'}} onClick={closeCreateForButton}/>}
                        <Typography>{image.imageUrl && !image.croppedImage ? 'Przytnij' : image.croppedImage ? "Edytuj" : 'Utwórz nowy post'}</Typography>
                        {image.imageUrl && <Typography sx={{cursor: 'pointer', color: 'rgb(0, 146, 246)', fontSize: '15px'}} onClick={image.croppedImage ? handleSubmit : onCrop}>{image.croppedImage ? 'Udostępnij' : 'Dalej'}</Typography>}
                    </Stack>
                </Stack>
                {image.imageUrl && !image.croppedImage ? (
                    <ImageCropDialog
                        id={image.id}
                        imageUrl={image.imageUrl}
                        cropInit={image.crop}
                        zoomInit={image.zoom}
                        aspectInit={image.aspect}
                        croppedAreaPixels={croppedAreaPixels}
                        setCroppedAreaPixels={setCroppedAreaPixels}
                    // onCancel={onCancel}
                    // setCroppedImageFor={setCroppedImageFor}
                    // resetImage={resetImage}
                    />
                ) : image.croppedImage ? (
                    <Stack direction="row" height="100%" width="100%" sx={{overflow: 'hidden'}}>
                        <Box style={{justifyContent: 'center', alignItems: 'center', height:'100%', width:'68%', background: 'rgb(18,18,18)'}}>
                            <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'contain'}}>
                                <img src={image.croppedImage} alt="cropped image" style={{width: 'auto', height: '100%', transform: 'scale(1)'}}/>
                            </Box>
                        </Box>
                        <Stack sx={{width: '32%', height: '100%'}}>
                            <Stack direction="row" alignItems='center' sx={{width: '100%', margin: '0 auto', padding: '18px 16px 14px 16px', boxSizing: 'border-box'}}>
                                <Avatar sx={{height: '32px', width: '32px'}}></Avatar>
                                <Typography sx={{fontWeight: '500', fontSize: '14px', color: "rgb(250,250,250)", ml: '15px'}}>{user.username}</Typography>
                            </Stack>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                                <textarea placeholder="Dodaj opis" className="text" onChange={(e) => setDescribe(e.target.value)} style={{background: 'transparent', 
                                                                                                                                          width: '100%', 
                                                                                                                                          height: '100%', 
                                                                                                                                          padding: '3px 16px', 
                                                                                                                                          boxSizing: 'border-box', 
                                                                                                                                          border:'none', 
                                                                                                                                          resize: 'none', 
                                                                                                                                          whiteSpace: 'wrap', 
                                                                                                                                          overflow: 'auto',
                                                                                                                                          color: 'rgb(250,250,250)',
                                                                                                                                          fontSize: '16px',
                                                                                                                                          fontFamily: 'Roboto'}}>
                                </textarea> 
                            </Box>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack justifyContent="center" alignItems="center" sx={{width: '100%', height: '100%', background: dragActive && 'rgb(18,18,18)'}}>
                        <Stack>
                            <svg aria-label="Ikona przedstawiająca multimedia takie jak obrazy lub filmy" className="_ab6-" color={dragActive ? '#0095f6' : "#fafafa"} fill={dragActive ? '#0095f6' : "#fafafa"} height="77" role="img" viewBox="0 0 97.6 77.3" width="96">
                                <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                                <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                                <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                            </svg>
                        </Stack>
                        <Typography textAlign="center" color="rgb(250,250,250)" fontSize="20px" mt="16px">Przeciągnij zdjęcia i filmy tutaj</Typography>
                        <Stack>
                            <button type="file" style={{padding: '8px 15px', background: 'rgb(0, 149, 246)', color: 'rgb(250, 250, 250)', border: 'none', borderRadius: '8px', marginTop: '24px', fontFamily: 'Roboto', fontWeight: '500', cursor:'pointer'}} onClick={onButtonClick}>
                                Wybierz z komputera
                            </button>
                        </Stack>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input ref={inputRef} type="file" id="hiddenFile" accept="image/*" style={{display: 'none'}} onChange={handleChange}/>
                        </form>
                </Stack>
                )}
            </Stack>
        </Stack>
     );
}
 
export default Create;
