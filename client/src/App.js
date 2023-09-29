import React, { Component } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        f1:[],
        f2:[],
        expectedFilePath:{},
        actualFilePath:{},
    };

    this.submit = this.submit.bind(this);
    this.expectedFileOnChange = this.expectedFileOnChange.bind(this);
    this.actualFileOnChange = this.actualFileOnChange.bind(this);
    this.test = this.test.bind(this);
  }
  test(){
    console.log(this.state.f1);
    console.log(this.state.f2);
  }
  expectedFileOnChange(e){
    
      this.setState({expectedFilePath: e.target.files[0]});
  
  }

  actualFileOnChange(e){
    this.setState({actualFilePath: e.target.files[0]});
}

  render() {
    return (
      <div className="App">
        <h1>f1</h1>
        <p>{this.state.f1}</p>
        <h1>f2</h1>
        <p>{this.state.f2}</p>
        <Row>
                <Col>
                <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Expected Inventory file</Form.Label>
                        <Form.Control type="file" onChange={this.expectedFileOnChange}  />
                        <Form.Label>Actual Inventory file</Form.Label>
                        <Form.Control type="file" onChange={this.actualFileOnChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.submit}>Submit</Button>
                </Form>
                </Col>
            </Row>
            <Button variant="primary" type="button" onClick={this.test}>Test</Button>
      </div>
    );
}

// To use await, the function that is after the await needs to return a new Promise.
// Not sure how else it works... need to work on it....
static readUploadedFileAsText(inputFile) {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    fr.onerror = () => {
      fr.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    fr.onloadend = () => {
      resolve(fr.result);
    };
    fr.readAsText(inputFile);
  });
};

async submit(event){
  event.persist();

  try {
    this.setState({f1: await App.readUploadedFileAsText(this.state.expectedFilePath)});
    this.setState({f2: await App.readUploadedFileAsText(this.state.actualFilePath)});
  } catch (e) {
    console.log(e);
  }
};

}
export default App;
