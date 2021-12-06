// GUI
const pane = new Tweakpane.Pane();

const PARAMS = {
  resources: 100,
  consumers: 0,
  speed: 1000,
  regen_rate: 10,
};

pane.addInput(PARAMS, 'regen_rate', {
  min: 1,
  max: 10,
  label: 'regeneration rate'
});

pane.addMonitor(PARAMS, 'resources', {
  view: 'graph',
  min: 0,
  max: 110,
});

pane.addInput(PARAMS, 'speed', {
  min: 500,
  max: 2000,
});

const folder = pane.addFolder({
  title: 'Consumers',
  expanded: false,
});

folder.addMonitor(PARAMS, 'consumers');

add = folder.addButton({title: 'Add'});
remove = folder.addButton({title: 'Remove'});