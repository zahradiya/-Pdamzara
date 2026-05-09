'use server'
import { GetBill } from "@/services/bill";
import Searching from "./searching";
import Pagination from "@/components/pagination";
import { GetCustomerApi } from "@/services/customer";
import DropBillButton from "./dropbill";
import FormBill from "./frombill";
import VerifyPayment from "./verifyPayment";
import ViewProof from "./ViewProof";

type Props = {
    searchParams: Promise<{
        page?:number
        quantity?:number
        search?:string
    }>
}


const BillPage = async(prop:Props) => {
    const searchParams = await prop.searchParams;
    const {page = 1, quantity = 10, search = ""} = searchParams;
    const customerList = await GetCustomerApi({
        page: 1, quantity: 1000,
        search: ""
    });
    const billList = await GetBill({page, quantity, search});
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 ">Bill Page</h1>
            <p className="">Welcome to the Bill page!</p>
            <FormBill label="Tambah Bill" 
               className="bg-blue-500 p-2 rounded hover:bg-blue-600 mb-4"
               customerList={customerList.data ||undefined} />
            <Searching search={search} />
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-300 ">
                        <th className="border border-gray-300 p-2 ">Nama Customer</th>
                        <th className="border border-gray-300 p-2">Bulan</th>
                        <th className="border border-gray-300 p-2">Tahun</th>
                        <th className="border border-gray-300 p-2">Nilai Meteran</th>
                        <th className="border border-gray-300 p-2">Harga</th>
                        <th className="border border-gray-300 p-2">Nilai Penggunaan</th>
                        <th className="border border-gray-300 p-2">Total Bayar</th>
                        <th className="border border-gray-300 p-2 w-32">Status</th>
                        <th className="border border-gray-300 p-2">Status Verified</th>
                        <th className="border border-gray-300 p-2">Nama Service</th>
                        <th className="border border-gray-300 p-2 w-70">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {billList.data && billList.data.map((bill) => (
                        <tr key={bill.id}>
                            <td className="border border-gray-300 p-2">{bill.customer.name}</td>
                            <td className="border border-gray-300 p-2 ">{bill.month}</td>
                            <td className="border border-gray-300 p-2">{bill.year}</td>
                            <td className="border border-gray-300 p-2 ">{bill.measurement_number}</td>
                            <td className="border border-gray-300 p-2">{bill.usage_value}</td>
                            <td className="border border-gray-300 p-2">{bill.price}</td>
                            <td className="border border-gray-300 p-2 ">{bill.amount}</td>
                            <td className="border border-gray-300 p-2">
                                {bill.paid ? 
                                <div className="bg-green-500 text-white px-2 py-1 rounded">Lunas</div> : 
                                <div className="bg-red-500 text-white px-2 py-1 rounded">Belum Lunas</div>}
                            </td>

                           <td className="border border-gray-300 p-2 ">
                                {bill.paid? 'diterima':bill.payments!= null ?
                                <VerifyPayment verified={bill.payments?.verified} idPayment={bill.payments?.id||undefined} /> : 'Belum Bayar'}
                            </td>
                            <td className="border border-gray-300 p-2 ">{bill.service.name}</td>
                            <td className="border border-gray-300 p-2">
                                <div className="flex flex-row gap-2">
                                    <ViewProof label="Lihat Bukti" proofUrl={bill.payment_proof || ''
                                    } className={"bg-green-500 text-white cursor-pointer hover:bg-green-700 px-2 py-1 rounded"} />
                                    <FormBill label="Edit" id={bill.id} formData={bill} 
                                    className="bg-blue-500 text-white hover:bg-blue-300 px-2 py-1 rounded" customerList={customerList.data || undefined} />
                                    <DropBillButton billId={bill.id} />
                                </div>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={page} count={billList.count||0} perPage={quantity} colorActive="bg-slate-800" colorPage="bg-slate-500" optionPerPage={[10, 50, 100, 500, 1000]} id=""/>
        </div>
    )
}
export default BillPage