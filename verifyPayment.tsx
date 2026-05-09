'use client'
import { VerifyPaymentApi } from "@/services/payment"
import { useState } from "react"
import { useRouter } from "next/navigation"
type VerifyPaymentProps = {
  verified?: boolean
  idPayment?:number
}
const VerifyPayment = ({ verified, idPayment }: VerifyPaymentProps) => {
const [verify, setVerify] = useState<boolean | undefined>(verified)
const router = useRouter()
const handdleVerify = async(e: React.ChangeEvent<HTMLSelectElement>) =>{
    const value = e.target.value
        const Verify = await VerifyPaymentApi(value, idPayment)
        // console.log(verified)
        router.refresh()
        setVerify(
          value === "" ? undefined : value === "true"
        )
}
  return (
    <select
      value={verify === undefined ? "" : String(verify)}
      onChange={(e) => {
        handdleVerify(e)
      }}
    >
      <option value="">Belum diverifikasi</option>
      <option value="false">ditolak</option>
      <option value="true">diterima</option>
    </select>
  )
}
export default VerifyPayment
