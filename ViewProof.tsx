'use client'
import Modal from "@/components/modal"
import { useState } from "react"
import Image from "next/image"
import { BASE_API_URL } from "@/global"


type Props = {
    label:string
    className:string
    proofUrl: string
}
const ViewProof = ({ proofUrl, label, className }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button  onClick={() => setIsOpen(true)} className={`${className}`}>
                {label}
            </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Tampil Bukti Pembayaran">
                <div className="flex justify-center">
                    <Image width={100} height={100} src={proofUrl?`${BASE_API_URL}/payment-proof/${proofUrl}`:'/image-not-found1.png'} alt="Proof of Payment" className="w-full" />
                </div>
            </Modal>
        </div>
    );
}
         
export default ViewProof;
