import { Component, OnDestroy, OnInit } from '@angular/core';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy {
  player?: videojs.Player;
  constructor() { }

  ngOnInit(): void {
    this.player = videojs('video', {
      fluid: true,
      sources: [
        {
          src: '../assets/que_es_un_pc.mp4',
          type: 'video/mp4',
        },
      ],
      poster: '../assets/imgs/poster.png',
    });

    var CustomModal = videojs.getComponent('ModalDialog');
    var myPlayer = this.player;
    const myComponent = this.createComponent(myPlayer);

    let lastStopped = 0;
    let botonInfo = document.createElement('div');
    let modal: videojs.ModalDialog;
    botonInfo.innerHTML = `
    <div>
      <button class="boton-info">
        <h1>🤔¿Sabías que...?</h1>
        <p>¡Hazme click!</p>
      </button>
    </div>`;

    myPlayer.on('timeupdate', () => {
      if (Math.floor(myPlayer.currentTime()) != lastStopped) {

        if (Math.floor(myPlayer.currentTime()) === 10) {
          lastStopped = 10;
          this.showBotonInfo(myPlayer, botonInfo);
          //Contenido del modal que despliega el botonInfo
          let content = `
          <div class="container-wrapper">
            <div class="contenedor">
              <h1>Sabías que...</h1>
              <p>El primer ordenador considerado como tal fue el <a target="_blank" href="https://es.wikipedia.org/wiki/Z1">Z1</a>, diseñado y construido en 1938 por el ingeniero alemán
              <a target="_blank" href="https://es.wikipedia.org/wiki/Konrad_Zuse">Konrad Zuse</a>. Básicamente, era una calculadora binaria, mecánica que leía instrucciones de una cinta perforada.</p>
              <img id="z1" src="../assets/imgs/z1.jpg"/>
            </div>
          </div>`;
            modal = this.createModal(
            myPlayer,
            myComponent,
            CustomModal,
            content
          );

          botonInfo.addEventListener('click', () => {
            modal.open();
          });
        }

        if (Math.floor(myPlayer.currentTime()) === 20) {
          lastStopped = 20;
          this.removeBotonInfo(myPlayer, botonInfo, modal);
        }

        if (Math.floor(myPlayer.currentTime()) === 42) {
          let content = `
          <div class="container-wrapper">
            <div class="contenedor">
              <h1>¡Pregunta sorpresa!</h1>
                <h2>¿Sabes cómo se representa la información en un ordenador?</h2>
                <div class="btn-container">
                  <button id="1" class="btn btn-primary btn-default">a. Con ceros y unos (sistema binario)</button>
                  <br/><br/>
                  <button id="2" class="btn btn-primary btn-default">b. Con números (sistema decimal)</button>
                  <br/><br/>
                  <button id="3" class="btn btn-primary btn-default">c. Con letras y números (sistema alfanúmerico)</button>
                </div>
            </div>
          </div>
          `;
          let correctAnswer = '1';
          let questionModal = this.createModal(
            myPlayer,
            myComponent,
            CustomModal,
            content
          );
          questionModal.open();
          lastStopped = 42;
          this.questionModalHandler(questionModal, correctAnswer);
        }

        if (Math.floor(myPlayer.currentTime()) === 128) {
          lastStopped = 128;
          this.showBotonInfo(myPlayer, botonInfo);

          let content = `
            <div class="container-wrapper">
              <div class="contenedor">
                <h1>Sabías que...</h1>
                <h2><a href="https://es.wikipedia.org/wiki/Supercomputadora" target="_blank">Supercomputador</a> vs <a href="https://es.wikipedia.org/wiki/Unidad_central" target="_blank">Mainframe</a></h2>
                <p>Aunque ambos sean similares, existen características diferenciadoras entre ellos.</p>
                <table>
                  <tr>
                    <th><strong>Supercomputador</strong></th>
                    <th><strong>Mainframe</strong></th>
                  </tr>
                  <tr>
                    <td> Se utilizan para cálculos matemáticos complejos, simulaciones, modelado de fenómenos físicos, etc.</td>
                    <td> Se utilizan como almacenamiento para grandes bases de datos y al que acceden muchísimos usuarios simultáneamente</td>
                  </tr>
                  <tr>
                    <td>Mayor velocidad de procesamiento que un mainframe</td>
                    <td>Menor velocidad de procesamiento que un superordenador</td>
                  </tr>
                  <tr>
                    <td>Actualmente, tienen como sistema operativo Linux y sus variantes</td>
                    <td>Pueden tener múltiples sistemas operativos simultáneamente</td>
                  </tr>
                  <tr>
                    <td><img src="../assets/imgs/supercomputador.jpg"/></td>
                    <td><img src="../assets/imgs/mainframe.jfif"/></td>
                  </tr>
                </table>
              </div>
            </div>
          `;
          modal = this.createModal(
            myPlayer,
            myComponent,
            CustomModal,
            content
          );

          botonInfo.addEventListener('click', () => {
            modal.open();
          });


        }

        if (Math.floor(myPlayer.currentTime()) === 135) {
          lastStopped = 135;
          this.removeBotonInfo(myPlayer, botonInfo, modal);
        }

        if (Math.floor(myPlayer.currentTime()) === 202) {
          let content = `
          <div class="container-wrapper">
            <div class="contenedor">
              <h1>¡Pregunta sorpresa!</h1>
                <h2>Entonces, cuando utilizas el ordenador, ¿con qué parte del ordenador estás interactuando directamente?</h2>
                <div class="btn-container">
                  <button id="1" class="btn btn-primary btn-default">a. Con el Software</button>
                  <br/><br/>
                  <button id="2" class="btn btn-primary btn-default">b. Con el monitor</button>
                  <br/><br/>
                  <button id="3" class="btn btn-primary btn-default">c. Con el Hardware</button>
                  <br/><br/>
                  <button id="4" class="btn btn-primary btn-default">d. Con el ratón</button>
                </div>
            </div>
          </div>
          `;
          let correctAnswer = '3';
          let questionModal = this.createModal(
            myPlayer,
            myComponent,
            CustomModal,
            content
          );
          lastStopped = 202;
          this.showQuestionModal(questionModal);
          this.questionModalHandler(questionModal, correctAnswer);
        }

        if (Math.floor(myPlayer.currentTime()) === 273) {
          let content = `
          <div class="container-wrapper">
            <div class="contenedor">
              <h1>¡Pregunta sorpresa!</h1>
                <h2>¿Sabes en qué se diferencia una señal digital de una analógica?</h2>
                <div class="btn-container">
                  <button id="1" class="btn btn-primary btn-default">a. La señal digital es la que se usa actualmente</button>
                  <br/><br/>
                  <button id="2" class="btn btn-primary btn-default">
                  b. La señal digital es discontinua y toma solo dos valores. Y la analógica es continua y toma infinitos valores.</button>
                  <br/><br/>
                  <button id="3" class="btn btn-primary btn-default">
                  c. La señal digital es continua y toma infinitos valores. Y la analógica es discontinua y toma solo dos valores.</button>
                  </button>
                </div>
            </div>
          </div>
          `;
          let correctAnswer = '2';
          let questionModal = this.createModal(
            myPlayer,
            myComponent,
            CustomModal,
            content
          );
          questionModal.open();
          lastStopped = 273;
          this.questionModalHandler(questionModal, correctAnswer);
        }

        if (Math.floor(myPlayer.currentTime()) === 286) {
          lastStopped = 286;
          this.showBotonInfo(myPlayer, botonInfo);

          let content = `
            <div class="container-wrapper">
              <div class="contenedor">
                <h1>Sabías que...</h1>
                <h2>Tipos de puertos para periféricos</h2>
                <div class="puerto-container">
                  <div class="puerto-img">
                    <img src="../assets/imgs/usb-a.jpg"/>
                    <img src="../assets/imgs/usb-c.jpg" />
                  </div>
                  <div class="puerto-info">
                    <h4><strong>Puertos USB</strong></h4>
                    <p>Actualmente, los puertos USB se usan para conectar todo tipo de periféricos, ya que son capaces de transmitir datos, video y audio. Un ordenador de hoy puede traer puertos <a target="_blank" href="https://es.wikipedia.org/wiki/Universal_Serial_Bus">USB-A</a> y <a target="_blank" href="https://es.wikipedia.org/wiki/USB-C">USB-C</a></p>
                  </div>
                </div>
                <br/>
                <hr/>
                <br/>
                <div class="puerto-container">
                  <div class="puerto-info">
                    <h4><strong>Puertos de vídeo</strong></h4>
                    <p>Para conectar monitores y televisiones al ordenador hay 4 tipos de puertos. Aunque se ven cada vez menos, los ordenadores de escritorio siguen trayendo los conectores de pines <a target="_blank" href="https://es.wikipedia.org/wiki/Video_Graphics_Array">VGA</a> y <a target="_blank" href="https://es.wikipedia.org/wiki/Digital_Visual_Interface">DVI</a>. Los actuales son <a target="_blank" href="https://es.wikipedia.org/wiki/DisplayPort">Display Port</a> y <a target="_blank" href="https://es.wikipedia.org/wiki/High-Definition_Multimedia_Interface">HDMI</a>, que también transmiten audio.</p>
                  </div>
                  <div class="puerto-img">
                    <img src="../assets/imgs/vga.jfif"/>
                    <img src="../assets/imgs/hdmi.jpg" />
                  </div>
                </div>
                <br/>
                <hr/>
                <br/>
                <div class="puerto-container">
                  <div class="puerto-img">
                    <img src="../assets/imgs/puertos-audio.png"/>
                    <img src="../assets/imgs/jack.png" />
                  </div>
                  <div class="puerto-info">
                    <h4><strong>Puertos de audio</strong></h4>
                    <p>En los ordenadores convencionales de sobremesa, hay 3 puertos <a target="_blank" href="https://es.wikipedia.org/wiki/Conector_de_audio_anal%C3%B3gico">Jack 3,5mm</a>: entrada de micrófono en mono, entrada de audio en estéreo y salida de audio. En los portátiles hay uno que permite entrada y salida de audio simultáneamente.</p>
                  </div>
                </div>
              </div>
            </div>
          `;
          modal = this.createModal(
            myPlayer,
            myComponent,
            CustomModal,
            content
          );

          botonInfo.addEventListener('click', () => {
            modal.open();
          });
        }

      }
    });
  }

  showQuestionModal(questionModal: videojs.ModalDialog) {
    questionModal.open();
    // asi, no funciona
    // questionModal
    //   .contentEl()
    //   .querySelector('.container-wrapper')
    //   ?.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
    //     duration: 500,
    //     iterations: 1,
    //   });
  }

  questionModalHandler(questionModal: videojs.ModalDialog, correctAnswer: string) {
    questionModal
      .contentEl()
      .querySelectorAll('.btn')
      .forEach((button) => {
        button.addEventListener('click', () => {
          button.classList.remove('btn-default');
          if (button.id === correctAnswer) {
            this.correctAnswerHandler(button, questionModal);
          } else {
            this.wrongAnswerHandler(button, questionModal);
          }
        });
      });
  }

  correctAnswerHandler(button: Element, questionModal: videojs.ModalDialog) {
    button.classList.add('btn-success');
    alert('¡Respuesta correcta!');
    setTimeout(() => {
      questionModal.close();
    }, 1000);
  }

  wrongAnswerHandler(button: Element, questionModal: videojs.ModalDialog) {
    button.classList.add('btn-fail');
  }

  removeBotonInfo(myPlayer: VideoJsPlayer, botonInfo: HTMLDivElement, modal: videojs.ModalDialog) {
    botonInfo
      ?.querySelector('.boton-info')
      ?.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(0)' },
        ],
        {
          duration: 500,
          iterations: 1,
        }
      );
    setTimeout(() => {
      myPlayer.el().removeChild(botonInfo);
      myPlayer.removeChild(modal);
      
    }, 500);


  }

  createModal(
    myPlayer: VideoJsPlayer,
    myComponent: any,
    CustomModal: {
      new(
        player: VideoJsPlayer,
        options?: videojs.ModalDialogOptions | undefined
      ): videojs.ModalDialog;
      prototype: videojs.ModalDialog;
    },
    content: string
  ) {
    // var content = `
    //       <div class="container-wrapper">
    //         <div class="contenedor">
    //           <h1>Sabías que...</h1>
    //           <p>El primer ordenador considerado como tal fue el Z1, diseñado y construido en 1938 por el ingeniero alemán
    //           Konrad Zuse. Básicamente, era una calculadora binaria, mecánica que leía instrucciones de una cinta perforada.</p>
    //           <img src="../assets/imgs/z1.jpg"/>
    //         </div>
    //       </div>`;
    myComponent.contentEl().innerHTML = content;

    var modal = new CustomModal(myPlayer, {
      temporary: false,
      content: myComponent.contentEl(),
    });

    modal.createEl();
    myPlayer.addChild(modal);
    return modal;
  }

  showBotonInfo(myPlayer: VideoJsPlayer, botonInfo: HTMLDivElement) {
    myPlayer.el().appendChild(botonInfo);
    botonInfo
      .querySelector('.boton-info')
      ?.animate(
        [
          { transform: 'scale(0)' },
          { transform: 'scale(1.2)' },
          { transform: 'scale(1)' },
        ],
        {
          duration: 500,
          iterations: 1,
        }
      );
  }

  // Dispose the player OnDestroy
  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  createComponent(myPlayer: VideoJsPlayer): any {
    var Component = videojs.getComponent('Component');
    class SabiasQue extends Component {
      constructor(player: VideoJsPlayer, options: VideoJsPlayerOptions) {
        super(player, options);
      }
    }
    return new SabiasQue(myPlayer, {});
  }
}
