import './App.css';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import DialogBox from './modal';
import { useState } from 'react';



function App() {
  const [showModal, setShowModal] = useState(false);
  const [schema, setSchema] = useState([]);
  const [segmentName, setSegmentName] = useState('');

  const formElementStyle = {
    display: 'flex',
    flexDirection: 'column'
  }

  const buttonStyle = {
    padding: '10px',
    position: 'absolute',
    left: '20%',
    top: '10%'
  }

  const submit = () => {
   let obj = {
    segment_name: segmentName,
    schema: schema.map(x => {
      let obj = {};
      obj[x.value] = x.label;
      return obj;
    })
   }

   fetch('https://webhook.site/f9fd2308-6794-45d0-bb86-4ba1d5ee6e42', {
    method: 'POST',
    body: JSON.stringify(obj)
   }).then(res => res.json()).then(res => {
    debugger;
    console.log(res);

   })
   
  }

  return (
    <div className="App">
      {/* <Popup className='Popup' trigger=
        {<button> Save Segment </button>}
        position="right center">
        <div>
          <h4>Enter the Name of Sagment</h4>
          <textbox ></textbox>
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </Popup> */}
      <button style={buttonStyle} onClick={() => setShowModal(true)}>Save Segment</button>
      <div id="modal-root" />
      {showModal && <DialogBox onClose={() => setShowModal(false)}>
        <div style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div className="form">
            <div>
              <label>Enter Name of Segment</label>
              <input type="text" style={{ padding: '10px' }} onChange={(e) => setSegmentName(e.target.value)} value={segmentName} />
            </div>
            <div>
              {schema.length > 0 && schema.map((s, si) => <select key={'op_' + si} onChange={(e) => {
                let ss = schema[si];
                ss.value = e.target.value;
                ss.label = e.target.options[e.target.selectedIndex].text;
              }} style={{ marginBottom: '10px', padding: '10px' }}>
                <option value='' selected={s.value == ''}>Add schema to segment</option>
                <option value='first_name' selected={s.value == 'first_name'} disabled={schema.filter(x => x.value == 'first_name').length > 0}>First Name</option>
                <option value='last_name' selected={s.value == 'last_name'} disabled={schema.filter(x => x.value == 'last_name').length > 0}>Last Name</option>
                <option value='gender' selected={s.value == 'gender'} disabled={schema.filter(x => x.value == 'gender').length > 0}>Gender</option>
                <option value='age' selected={s.value == 'age'} disabled={schema.filter(x => x.value == 'age').length > 0}>Age</option>
                <option value='account_name' selected={s.value == 'account_name'} disabled={schema.filter(x => x.value == 'account_name').length > 0}>Account Name</option>
                <option value='city' selected={s.value == 'city'} disabled={schema.filter(x => x.value == 'city').length > 0}>City</option>
                <option value='state' selected={s.value == 'state'} disabled={schema.filter(x => x.value == 'state').length > 0}>state</option>
              </select>)}
            </div>
            <a href="#" onClick={() => setSchema([...schema, { label: '', value: '' }])}>+ Add new schema</a>
          </div>



          <div style={{display: 'flex'}}>
            <button style={{marginRight: '5px'}} onClick={() => submit()}>save the segment</button>
            <button>Cancel</button>
          </div>
        </div>
      </DialogBox>}
    </div>
  )
}
export default App;
