// import { useEffect, useRef } from "react"

// export const Receiver = () => {

//     const videoRef = useRef<HTMLVideoElement>(null)

//     useEffect(() => {
//         const receiver = new WebSocket("ws://localhost:8080")
//         receiver.onopen = () => {
//             receiver.send(
//                 JSON.stringify({
//                     type: "receiver"
//                 })
//             )
//         }
//         initiateConnection(receiver)
//     }, [])

//     const initiateConnection = async(socket:WebSocket) => {
//         if(!socket) return 

//         const pc = new RTCPeerConnection;

//         // pc.ontrack = async(event) => {
//         //     console.log("event",event)
//         //     // if(videoRef.current){
//         //     //     videoRef.current.srcObject = new MediaStream([event.track])
//         //     //     videoRef.current.play()
//         //     // }
//         // }

//         pc.ontrack = (event) => {
//             const video = document.createElement('video');
//             document.body.appendChild(video);
//             video.srcObject = new MediaStream([event.track]);
//             video.play()
//         }

//         socket.onmessage = async(event) => {
//             const message = JSON.parse(event.data)
//             if(message.type === "createOffer"){
//                 await pc.setRemoteDescription(message.sdp)
//                 const answer = await pc.createAnswer()
//                 await pc.setLocalDescription(answer)
//                 socket?.send(
//                     JSON.stringify({
//                         type:"createAnswer",
//                         sdp:pc.localDescription
//                     })
//                 )
//             }
//             if(message.type === "iceCandidate"){
//                 pc.addIceCandidate(message.candidate)
//             }
//         }

//         pc.onicecandidate = (event) => {
//             if(event.candidate){
//                 socket?.send(JSON.stringify({
//                     type:"iceCandidate",
//                     candidate: event.candidate
//                 }))
//             }
//         }
//     }


//     return (
//     <div>
//         <video autoPlay={true} ref={videoRef} ></video>
//     </div>
//     )
// }

import { useEffect } from "react"


export const Receiver = () => {
    
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'receiver'
            }));
        }
        startReceiving(socket);
    }, []);

    function startReceiving(socket: WebSocket) {
        const video = document.createElement('video');
        document.body.appendChild(video);

        const pc = new RTCPeerConnection();
        pc.ontrack = (event) => {
            video.srcObject = new MediaStream([event.track]);
            video.play();
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createOffer') {
                pc.setRemoteDescription(message.sdp).then(() => {
                    pc.createAnswer().then((answer) => {
                        pc.setLocalDescription(answer);
                        socket.send(JSON.stringify({
                            type: 'createAnswer',
                            sdp: answer
                        }));
                    });
                });
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        }
    }

    return <div>
        
    </div>
}