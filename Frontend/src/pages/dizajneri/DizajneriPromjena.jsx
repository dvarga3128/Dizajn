import DizajnerService from "../../services/DizajnerService"
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";


export default function DizajneriPromjena(){

    const [dizajner,setDizajner] = useState({})
    const navigate = useNavigate()
    const routeParams = useParams()

    async function dohvatiDizajner(){
        const odgovor = await DizajnerService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        let s = odgovor.poruka
        s.izvodiSeOd = moment.utc(s.izvodiSeOd).format('yyyy-MM-DD')
        setDizajner(s)
    } 

    useEffect(()=>{
        dohvatiDizajner();
     },[])

     async function promjena(dizajner) {
        //console.log(dizajner)
        //console.log(JSON.stringify(dizajner))
        const odgovor = await DizajnerService.promjena(routeParams.sifra,dizajner)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.DIZAJNER_PREGLED)
    }

    function obradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server
        let podaci = new FormData(e.target)
        //console.log(podaci.get('naziv'))
        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email')
        })
    }

    return(
        <>
        Promjena dizajnera
        <Form onSubmit={obradiSubmit}>

        <Form.Group controlId="ime">
                <Form.Label>ime</Form.Label>
                <Form.Control type="text" name="ime" required defaultValue={dizajner.ime} />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>prezime</Form.Label>
                <Form.Control type="text" name="prezime" required defaultValue={dizajner.prezime}/>
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>email</Form.Label>
                <Form.Control type="text" name="email" required defaultValue={dizajner.email}/>
            </Form.Group>

        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.DIZAJNER_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Promjeni dizajner</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}