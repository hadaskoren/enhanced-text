import { FunctionComponent, useState, useEffect } from "react";

import {  Button, Flex, Input, Modal, Pagination } from "antd";
import textMap from '../data.js'

export const MainComp: FunctionComponent = () => {
  const [textArea1, setTextArea1] = useState('');
  const [textArea1Enhanced, setTextArea1Enhanced] = useState([]);
  const [isEnhanced1Clicked, setIsEnhanced1Clicked] = useState(false);
  const [tryAgainClicked, setTryAgainClicked] = useState(0);

  const [error, setError] = useState("");

  useEffect(() => {
    switch(tryAgainClicked) {
      case 1:
        setTextArea1Enhanced([...textArea1Enhanced, 'new text'])
        break;
      case 2:
        setTextArea1Enhanced([...textArea1Enhanced, 'another text'])
        break;
      case 3:
        setTextArea1Enhanced([...textArea1Enhanced, 'another text 2'])
        break;
    }
  }, [tryAgainClicked, setTextArea1Enhanced, textArea1Enhanced]);

  const handleChange = () => {
    setIsEnhanced1Clicked(true)
    if (tryAgainClicked === 0) {
      if(textMap[textArea1]) {
        setTextArea1Enhanced([textMap[textArea1]])
      } else {
        setError('No enhanced text found')
      }
    }
  };

  return (
    <Flex justify="center" vertical style={{padding: '0 50px', width: '100%'}}>
      <h1>Enable Enhanced Exercise</h1>

      <Flex vertical width="100px">
        <Input.TextArea rows={4} value={textArea1}
            placeholder="Text Field 1" maxLength={6}
            onChange={(e) => {setTextArea1(e.currentTarget.value)}}/>

        {isEnhanced1Clicked && error === "" && (<Flex vertical>
          <Input.TextArea rows={4} value={textArea1Enhanced[tryAgainClicked]} maxLength={6} />
          <Pagination defaultCurrent={1} total={textArea1Enhanced.length} />
        </Flex>)}

        {!isEnhanced1Clicked && <Button type="primary" onClick={handleChange}>Enhance</Button>}

        {isEnhanced1Clicked && error === "" && (<Flex justify="end">
          <Button
            type="primary"
            onClick={() => {
              setIsEnhanced1Clicked(false)
              setTryAgainClicked(0)
              setTextArea1('')
            }
          }
          >Discard</Button>

          <Button
            type="primary"
            disabled={tryAgainClicked === 3}
            onClick={() => {
              setTryAgainClicked(tryAgainClicked + 1)
              handleChange()
            }}>Try Again</Button>

          <Button
            type="primary"
            onClick={() => {
                setIsEnhanced1Clicked(false)
                setTextArea1(textArea1Enhanced[tryAgainClicked])
                setTryAgainClicked(0)
              }
            }>Use Text</Button>
        </Flex>)}
      </Flex>

      <Modal
        title="Error"
        cancelButtonProps={{ style: { display: 'none' } }}
        open={error !== ""} onOk={()=> {
          setError("")
          setIsEnhanced1Clicked(false)
        }}>
        {error && (<label style={{color: 'red'}}>{error}</label>)}
      </Modal>
    </Flex>
  );
};
