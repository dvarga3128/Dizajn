import { useEffect, useState } from "react"
import DizajnerService from "../../services/DizajnerService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function DizajneriPregled(){

    const navigate = useNavigate()

    const[dizajneri, setDizajneri] = useState();

    async function dohvatiDizajnere(){
        const odgovor = await DizajnerService.get();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        setDizajneri(odgovor.poruka)
    } 

    // Ovaj hook (kuka) se izvodi dolaskom na stranicu Dizajneri
    useEffect(()=>{
       dohvatiDizajnere();
    },[])

    function formatirajDatum(datum){
        if(datum==null){
            return 'Nije definirano';
        }
        return moment.utc(datum).format('DD. MM. YYYY.')
    }

    function vaucer(v){
        if(v==null) return 'gray'
        if(v) return 'green'
        return 'red'
    }

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeDizajnera(sifra)
    }

    async function brisanjeDizajnera(sifra) {
        
        const odgovor = await DizajnerService.brisanje(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiDizajnere();
    }


    return(
        <>
        <Link to={RouteNames.DIZAJNER_NOVI}
        className="btn btn-success siroko">Dodaj novi dizajner</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Email</th>
                   
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {dizajneri && dizajneri.map((dizajner,index)=>(
                    <tr key={index}>
                        <td>
                            {dizajner.ime}
                        </td>
                        <td>
                            {dizajner.prezime}
                        </td>
                        <td>
                            {dizajner.email}
                        </td>
                       <td>
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(dizajner.sifra)}
                            >
                                Obriši
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            onClick={()=>navigate(`/dizajneri/${dizajner.sifra}`)}
                            >
                                Promjena
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}