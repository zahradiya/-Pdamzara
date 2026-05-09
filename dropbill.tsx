'use client'
import { useRouter } from 'next/navigation';
import { Dropbill } from '@/services/bill';
import { getServerCookie } from '@/lib/server-cookies';


const DropBillButton = ({billId}: {billId: number}) => {
    const router = useRouter()
    const handleDelete = async () => {
        if (confirm("Are you sure to delete this bill?")) {
            await Dropbill(billId);
            router.refresh()
        }
    }
    return (
        <div>
            <button onClick={() => handleDelete()} className="bg-red-500 text-white cursor-pointer hover:bg-red-700 px-2 py-1 rounded">
                Drop
            </button>
        </div>
    );
}
export default DropBillButton

