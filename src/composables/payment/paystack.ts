import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@/composables/auth/user'
import { insertScriptTag } from '@/composables/utils/system'
import { nairaToKobo } from '@/composables/utils/currency'


declare global {
    interface Window {
        verified: boolean;
        google: any;
        PaystackPop: any;
        initMap: any;
        markerClusterer: any;
        recaptchaVerifier:any
    }
}


type extraMetaDataT = {
    channel: 'BOOKING_PAYMENT';
    taskId?: string;
    orderId?: string;
    bookingId?: string;
    walletId?: string;

}

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PSK_PUBLIC_KEY as string
const DECIMAL_FEE = 0.015

export let paystackModal
export const useMakePayment = async (handleOnClose, handleCallback) => {
    await insertScriptTag('https://js.paystack.co/v1/inline.js')
    const { id, username, user, userProfile } = useUser()
    const PaystackPop: Record<string, any> = window.PaystackPop
    const makePayment = async (amount: number, extra_metadata:extraMetaDataT, email = user.value?.email?.trim()) => {
        paystackModal = await PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            ref: uuidv4(),
            amount: nairaToKobo(paystack_final_price(amount)),
            currency: 'NGN',
            channels: '',
            email: email || user.value?.email?.trim() || userProfile.value?.email.trim(),
            metadata: {
                consumer_id: id.value,
                consumer_username: username.value,
                phone_number: userProfile.value?.phone,
                name: user.value?.displayName || userProfile.value?.username,
                ...extra_metadata
            },
            onClose: handleOnClose,
            callback: handleCallback
        })
        paystackModal.openIframe()
    }

    return { makePayment }
}


export const paystack_final_price = (price: number): number => {
    return price + paystack_applicableFee(price)
}

export const paystack_applicableFee = (price: number): number => {
    const baseFee = price * DECIMAL_FEE
    let totalFee = baseFee

    // Apply the ₦100 fee only for transactions ₦2500 and above
    if (price >= 2500) {
        totalFee += 100 // Adding a fixed fee of ₦100 for transactions ₦2500 and above
    }

    if (totalFee > 2000) { // Ensure the total fee does not exceed the cap of ₦2000
        return 2000
    }

    return Math.ceil(totalFee) // Use Math.ceil to round up to the nearest Kobo if necessary
}

// 09/32
// 4187 4274 1556 4246
// 828
