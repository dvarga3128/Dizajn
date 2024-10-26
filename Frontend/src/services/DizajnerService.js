import { HttpService } from "./HttpService";



async function get(){
    return await HttpService.get('/Dizajner')
    .then((odgovor)=>{
        //console.log(odgovor.data)
        //console.table(odgovor.data)
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        //console.log(e)
        return {greska: true, poruka: 'Problem kod dohvaćanja Dizajnera'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Dizajner/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja Dizajnera'}   
    })
}

async function dodaj(Dizajner){
    return await HttpService.post('/Dizajner',Dizajner)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja Dizajnera'}   
    })
}

async function promjena(sifra,Dizajner){
    return await HttpService.put('/Dizajner/' + sifra,Dizajner)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja Dizajnera'}   
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Dizajner/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja Dizajnera s šifrom '+sifra}   
    })
}


export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}
