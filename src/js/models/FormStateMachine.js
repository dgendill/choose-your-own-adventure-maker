function FormStateMachine() {
  if (!(this instanceof FormStateMachine)) {
    return new FormStateMachine();
  }

  this.state = null;
  this.message = "";
  this.visible = false;
}

const LOADING = "LOADING";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

FormStateMachine.prototype.enterLoading = function enterLoading(message) {
  this.state = LOADING;
  this.message = message;
  this.visible = true;
  return this;
}
FormStateMachine.prototype.enterSuccess = function enterSuccess(message) {
  this.state = SUCCESS;
  this.message = message;
  this.visible = true;
  return this;
}
FormStateMachine.prototype.enterFailure = function enterFailure(message) {
  this.state = FAILURE;
  this.message = message;
  this.visible = true;
  return this;
}
FormStateMachine.prototype.reset = function reset(message) {
  this.state = null;
  this.message = "";
  this.visible = false;
  return this;
}
FormStateMachine.prototype.hide = function reset(message) {
  this.visible = false;
  return this;
}
function is(state) {
  return this.state == state;
}
FormStateMachine.prototype.isLoading = function() {
  return is.bind(this)(LOADING);
}
FormStateMachine.prototype.isSuccess = function() {
  return is.bind(this)(SUCCESS);
}
FormStateMachine.prototype.isFailure = function() {
  return is.bind(this)(FAILURE);
}
FormStateMachine.prototype.classes = function() {
  return {
    'state-loading' : this.isLoading(),
    'state-success' : this.isSuccess(),
    'state-failure' : this.isFailure()
  }
}


export default FormStateMachine;