import * as WebMidi from "webmidi";

type setter = (outputs: string[]) => void;

function onEnabled(setInputs: setter, setOutputs: setter) {
  const inputs = [];
  const outputs = [];
  if (WebMidi.WebMidi.inputs.length < 1) {
    inputs.push("No devices detected");
  } else {
    WebMidi.WebMidi.inputs.forEach((device) => {
      inputs.push(device.name);
    });
  }
  if (WebMidi.WebMidi.outputs.length < 1) {
    outputs.push("No devices detected");
  } else {
    WebMidi.WebMidi.outputs.forEach((device) => {
      outputs.push(device.name);
    });
  }
  console.log('Setting inputs and outputs to', inputs, outputs);
  setInputs(inputs);
  setOutputs(outputs);  
}

export function connect(setInputs: setter, setOutputs: setter) {   
  WebMidi.WebMidi
    .enable()
    .then(() => onEnabled(setInputs, setOutputs))
    .catch(err => alert(err));
}

// function oldConnect() {
//   // does this get formatted
//   navigator.requestMIDIAccess()
//   .then(
//     (midi) => midiReady(midi),
//     (err) => console.log('Something went wrong', err));
// }

// function midiReady(midi) {
//   // Also react to device changes.
//   midi.addEventListener('statechange', (event) => initDevices(event.target));
//   initDevices(midi); // see the next section!
// }

// function initDevices(midi) {
//   // Reset.
//   midiIn = [];
//   midiOut = [];
  
//   // MIDI devices that send you data.
//   const inputs = midi.inputs.values();
//   for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
//     midiIn.push(input.value);
//   }
  
//   // MIDI devices that you send data to.
//   const outputs = midi.outputs.values();
//   for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
//     midiOut.push(output.value);
//   }
  
//   displayDevices();
//   startListening();
// }


// // Start listening to MIDI messages.
// function startListening() {
//   for (const input of midiIn) {
//     input.addEventListener('midimessage', midiMessageReceived);
//   }
// }

// function midiMessageReceived(event) {
//   // MIDI commands we care about. See
//   // http://webaudio.github.io/web-midi-api/#a-simple-monophonic-sine-wave-midi-synthesizer.
//   const NOTE_ON = 9;
//   const NOTE_OFF = 8;

//   const cmd = event.data[0] >> 4;
//   const pitch = event.data[1];
//   const velocity = (event.data.length > 2) ? event.data[2] : 1;
  
//   // You can use the timestamp to figure out the duration of each note.
//   const timestamp = Date.now();
  
//   // Note that not all MIDI controllers send a separate NOTE_OFF command for every NOTE_ON.
//   if (cmd === NOTE_OFF || (cmd === NOTE_ON && velocity === 0)) {
//     console.log(`🎧 from ${event.srcElement.name} note off: pitch:${pitch}, velocity: ${velocity}`);
  
//     // Complete the note!
//     const note = notesOn.get(pitch);
//     if (note) {
//       console.log(`🎵 pitch:${pitch}, duration:${timestamp - note} ms.`);
//       notesOn.delete(pitch);
//     }
//   } else if (cmd === NOTE_ON) {
//     console.log(`🎧 from ${event.srcElement.name} note off: pitch:${pitch}, velocity: {velocity}`);
    
//     // One note can only be on at once.
//     notesOn.set(pitch, timestamp);
//   }
// }

// function sendMidiMessage(pitch, velocity, duration) {
//   const NOTE_ON = 0x90;
//   const NOTE_OFF = 0x80;
  
//   const device = midiOut[selectOut.selectedIndex];
//   const msgOn = [NOTE_ON, pitch, velocity];
//   const msgOff = [NOTE_ON, pitch, velocity];
  
//   // First send the note on;
//   device.send(msgOn); 
    
//   // Then send the note off. You can send this separately if you want 
//   // (i.e. when the button is released)
//   device.send(msgOff, Date.now() + duration); 
// }