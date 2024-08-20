import React, { useState } from 'react';
import './MainPage.css';
import Navbar from './Navbar';

function MainPage() {
  const [wid, setWid] = useState('');
  const [hei, setHei] = useState('');
  const [rad, setRad] = useState('');
  const [shape, setShape] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const handleShape = (e) => {
    setShape(e.target.value);
    // Clear inputs when shape changes
    setWid('');
    setHei('');
    setRad('');
    setResult('');
    setLoading(false);
  }

  const hesapla = async () => {
    setLoading(true);

    if(shape === 'rectangle'){
      if(wid <= 0 || isNaN(wid)){
        setLoading(false);
        setResult('Lütfen geçerli değerler giriniz');
        return;
      }
      if(hei <= 0 || isNaN(hei)){
          setLoading(false);
          setResult('Lütfen geçerli değerler giriniz');
          return;
      }
      
      await pause(1000);
      const rslt = hei*wid;
      setLoading(false);
      setResult('Alan: ' + rslt.toFixed(2) + ' cm²');
      return;

    }else if(shape === 'triangle'){
      if(wid <= 0 || isNaN(wid)){
        setLoading(false);
        setResult('Lütfen geçerli değerler giriniz');
        return;
      }
      if(hei <= 0 || isNaN(hei)){
          setLoading(false);
          setResult('Lütfen geçerli değerler giriniz');
          return;
      }
      
      await pause(1000);
      const rslt = hei*wid/2;
      setLoading(false);
      setResult('Alan: ' + rslt.toFixed(2) + ' cm²');
      return;

    }else if(shape === 'circle'){ 
      const radius = parseFloat(rad);
      if(radius <= 0 || isNaN(rad)){
        setResult('Lütfen geçerli değerler giriniz');
        setLoading(false);
        return; 
      }

      await pause(1000);
      const rslt = 3.14 * rad * rad;
      setLoading(false);
      setResult('Alan: ' + rslt.toFixed(2) + ' cm²');
      return;

    }else{
      setResult('Lütfen geçerli bir şekil seçiniz');
      setLoading(false);
    }

  }

  return (
    <div>
      <Navbar/>
      <h1 className='title'>ALAN HESAPLAMA</h1>
      <div className='form'>
        <div className='shape'>
          <label>
            <input 
              type="radio" 
              name='shape'
              value='rectangle'
              checked={shape === 'rectangle'}
              onChange={handleShape}
              required
            />  
            Dikdörtgen veya Kare
          </label>
          <label>
            <input 
              type="radio" 
              name='shape'
              value='triangle'
              checked={shape === 'triangle'}
              onChange={handleShape}
              required
            />
            Üçgen
          </label>
          <label>
            <input 
              type="radio" 
              name='shape'
              value='circle'
              checked={shape === 'circle'}
              onChange={handleShape}
              required
            />  
            Daire
          </label>
        </div>

        {(shape === 'rectangle' || shape === 'triangle') && (
          <>
            <div className='form' id='wid'>
              <input 
                className='input' 
                type="number"
                placeholder='Taban (cm)'
                step="0.1"
                value={wid}
                onChange={(e) => setWid(e.target.value)}
                required
              />
              <span className='input-border'></span>
            </div>
            <div className='form' id='hei'>
              <input 
                className='input'
                type="number" 
                placeholder='Yükseklik (cm)'
                step='0.1'
                value={hei}
                onChange={(e) => setHei(e.target.value)}
                required
              />
              <span className='input-border'></span>
            </div>
          </>
        )}

        {shape === 'circle' && (
          <div className='form' id='rad'>
            <input 
              className='input'
              type="number" 
              placeholder='Yarıçap (cm)'
              step='0.1'
              value={rad}
              onChange={(e) => setRad(e.target.value)}
              required
            />
            <span className='input-border'></span>
          </div>
        )}

        <button 
          className="button" 
          type="button" 
          onClick={hesapla} 
          disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : ('Hesapla')}
        </button>
      </div>
      <div className='sonuc'>
        <div id='sonuc'>{result}</div>
      </div>
    </div>
  );
}

export default MainPage;
