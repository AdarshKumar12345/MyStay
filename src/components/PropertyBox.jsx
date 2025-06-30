"use client"

import { deleteProperty } from '@/app/actions/deleteProperty';
import ListingsCard from './listing-card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function PropertyBox({ each }) {
    
    const router = useRouter();
    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await deleteProperty(each.id)
        if(res.ok) {
            toast("property deleted successfully");
            router.refresh();
        }
    }
  return (
    <ListingsCard
        listing={each}
        showSecondaryBtn
        secondaryBtnLabel={"Delete this property"}
        onAction={handleDelete}
    />
  )
}

export default PropertyBox