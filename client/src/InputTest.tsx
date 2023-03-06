import { useState, useRef } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import {BsUpload} from 'react-icons/bs'
import {CiEdit} from 'react-icons/ci'
function App() {
	const radioSelect=[{
		id: 1,
		name: 'radio 1',
		state: false
	},
	{
		id: 2,
		name: 'radio 2',
		state: false
	},
	{
		id: 3,
		name: 'radio 3',
		state: false
	},
	
	]
	const [text, setText] = useState(null);
	const [radioInput, setRadioInput] = useState(radioSelect)
	const [bgv, setBgv] = useState(0)
const input = useRef(null)
const handleClick = () => {
	input.current.click()
	console.log('clicked')
	console.log(text)
}
const handleChange = (e) => {
	const uploadedFile =e.target.files[0]
	console.log(uploadedFile)
	setText(uploadedFile)
}
const handleRadioClick = (id, name) => {
console.log(id)
const x = 	radioSelect.map(item => {
		return item.id === id ? {...item, state: true}: {...item, state: false}
	})

	setRadioInput(x)
	switch (name) {
		case 'radio 1':
			setBgv(1)
			break;
		case 'radio 2':
			setBgv(2)
			break;
		case 'radio 3':
			setBgv(3)
			break;
	
		default:
			break;
	}
	
}


	return (
		<div className="App" style={{padding: '5rem',}}>
			<button onClick={handleClick} style={{cursor: 'pointer',border: '1px solid #ddd',borderRadius: '8px', backgroundColor: '#fff' ,padding: '0.5rem 01rem', fontSize:'1rem', }}>
				{text? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}><CiEdit size={20} /> <span style={{whiteSpace: 'nowrap'}}>{text.name}</span> </div> :<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}><BsUpload /> <span>Upload a file...</span> </div>}
			</button>
			<input ref={input} style={{display : 'none'}} onChange={handleChange} className='file-input' type='file' />



			<div style={{border: '1px solid #ddd', borderRadius: '8px', padding: ' 2rem 1rem', marginTop: '1rem',display: 'flex',  alignItems: 'center', justifyContent: 'center', gap: '1rem', backgroundColor: bgv === 1 ? 'yellow': bgv === 2 ? 'olive': bgv === 3 ? 'tomato' : '#fff' }}>
				{
					radioInput.map((item)=> (
						<button key={item.id} onClick={() => handleRadioClick(item.id, item.name)} style={{padding:'2rem',cursor: 'pointer',fontSize: '1rem', textTransform: 'capitalize', border: '1px solid #ddd',borderRadius: '8px', backgroundColor: '#fff', display: 'flex',  alignItems: 'center', justifyContent: 'center', gap: '1rem'}} > <span style={{ position: 'relative',display:'flex', outline: '1px solid skyblue',outlineOffset: '0.2rem', width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: item.state ? 'skyblue' : 'inherit', padding:'0.4rem'}}></span> {item.name} </button>
					))
				}
			</div>
			<Routes>
				<Route path="/" element={<h1>I will be great</h1>} />
			</Routes>
		</div>
	);
}

export default App;
