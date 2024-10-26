import DizajnerService from "../../services/DizajnerService"
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function DizajneriDodaj(){

    const navigate = useNavigate()

    async function dodaj(dizajner) {
        //console.log(dizajner)
        //console.log(JSON.stringify(dizajner))
        const odgovor = await DizajnerService.dodaj(dizajner)
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
        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email')
        })
    }

    return(
        <>
        Dodavanje dizajnera
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="ime">
                <Form.Label>ime</Form.Label>
                <Form.Control type="text" name="ime" required />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>prezime</Form.Label>
                <Form.Control type="text" name="prezime" required />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>email</Form.Label>
                <Form.Control type="text" name="email" required />
            </Form.Group>

          
        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.DIZAJNER_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Dodaj dizajnera</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}