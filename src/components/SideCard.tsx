import { useState } from 'react';
import { Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { connect } from '../utils/MidiUtils';

const MidiInput: React.FC<{ input: string }> = ({ input }) => <div className="midiInput">{input}</div>;
const MidiOutput: React.FC<{ output: string }> = ({ output }) => <div className="midiOutput">{output}</div>;

const SideCard = () => {
  const [inputs, setInputs] = useState<string[]>(['Not yet connected']);
  const [outputs, setOutputs] = useState<string[]>(['Not yet connected']);

  function connectMidi() {
    connect(setInputs, setOutputs);
  }

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="h3 mb-2 pt-2 font-weight-bold text-secondary">MIDI Inputs</CardTitle>
          <CardText className="text-secondary mb-4" style={{ fontSize: '0.75rem' }}>
            {inputs.map(i => (
              <MidiInput input={i} />
            ))}
          </CardText>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="h3 mb-2 pt-2 font-weight-bold text-secondary">MIDI Outputs</CardTitle>
          <CardText className="text-secondary mb-4" style={{ fontSize: '0.75rem' }}>
            {outputs.map(o => (
              <MidiOutput output={o} />
            ))}
          </CardText>
        </CardBody>
      </Card>
      <Button color="success" className="font-weight-bold" onClick={connectMidi}>
        Refresh
      </Button>
    </>
  );
};
export default SideCard;
