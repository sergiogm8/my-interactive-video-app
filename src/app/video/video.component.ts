import { Component, OnDestroy, OnInit } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy {
  player?: videojs.Player;

  constructor() {}

  // Instantiate a Video.js player OnInit
  ngOnInit(): void {
    this.player = videojs('video', {
      sources: [
        {
          src: '../assets/video.mp4',
          type: 'video/mp4',
        },
      ],
    });

    // this.player.on('pause', () => {
    //   const contentEl = document.createElement('div');
    //   contentEl.innerHTML = `
    //   <div>
    //     <h1>
    //       <strong>Multiple Choice Question</strong>
    //     </h1>
    //     <br/>
    //     <button type="button" class="btn btn-primary" style="background: #007bff">Answer 1</button>
    //     <br/><br/>
    //     <button type="button" class="btn btn-primary" style="background: #007bff">Answer 2</button>
    //     <br/><br/>
    //     <button type="button" class="btn btn-primary" style="background: #007bff">Answer 3</button>
    //   </div>
    //   `;

    //   // Modals are temporary by default. They dispose themselves when they are
    //   // closed; so, we can create a new one each time the player is paused and
    //   // not worry about leaving extra nodes hanging around.
    //   const modal = this.player?.createModal(contentEl, {});

    //   // When the modal closes, resume playback.
    //   modal?.on('modalclose', () => {
    //     this.player?.play();
    //   });
    // });

    var pauseTime = 10;
    var myPlayer = this.player;
    myPlayer.on('timeupdate', () => {
      if (myPlayer.currentTime() >= pauseTime) {
        myPlayer.pause();
        pauseTime = Number(myPlayer.currentTime() + 999);
      }
    });
  }

  // Dispose the player OnDestroy
  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
