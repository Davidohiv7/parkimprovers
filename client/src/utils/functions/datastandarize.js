
export function getWhatsappLink(phone, name) {

    if(phone[0] === '+') {
        phone = phone.slice(1)
    }

    return `https://wa.me/${phone}?text=Hello%${name.split(' ').join('%')},%we%are%Parkimproves%and%we%want%to%help%you%to%improve%your%business!`

}

getWhatsappLink('+12136801930', 'Super Mega Parking')