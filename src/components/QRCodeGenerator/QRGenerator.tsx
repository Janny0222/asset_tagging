import React, {useRef} from 'react'
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { useQRCode } from "next-qrcode";

interface QRGeneratorProps {
    text: string,
}

const QRGenerator = ({text} : QRGeneratorProps) => {
    const qrValue = text;
    const { Canvas } = useQRCode();
  return (
    // <Canvas 
    //   text={qrValue}
    //   options={{
    //     errorCorrectionLevel: "H",
    //     margin: 1,
    //     scale: 14,
    //     width: 230,
        
    //   }}
    // />
    <QRCodeSVG 
      value={qrValue} 
      size={230}
      level="M"
      minVersion={8}
      marginSize={1}
    />
  )
}

export default QRGenerator