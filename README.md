# react
run to REACT-songs 

##learn from www.udemy.com (chapter 13: Integrating React with Redux)

## Instruction
# STEP 1:
1. console:
	npx create-react-app <name of project>
	npm i sass --save
	npm i node-sass --save
	npm install axios@0.18.1
	npm install semantic-ui-css --save
	npm install --save redux react-redux

    npm start

# STEP 2 (create react side):
2. Delete all from `src`  // обязательно в каждом проекте!!!
3. Create `src/index.js`: // обязательно в каждом проекте!!!
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App';
    import './index.scss';

    ReactDOM.render(<App />, document.querySelector("#root"));

4. Create `src/index.scss`, `src/scss/App.scss`, `src/components/App.js`:     // обязательно в каждом проекте!!!
    import React from 'react';
    import './scss/App.scss';
    const App = () =>{
        return( <div>App</div> )
    };
    export default App;

# STEP 3 (create redux side):
5. Create `src/actions/index.js` (Action creator): 
    // код разный для разных приложений
    // формат одинаковый для всех
    // `export` - создаем возможность использовать функцию в любом компоненте, в котором будет соответсвующий `import`
    export const selectSong = (song) =>{
        return{ //Return an action
            type: 'SONG_SELECTED',
            payload: song
        };
    };

6. Create `src/reducers/index.js`:     // код разный для разных приложений
    // `songsReducer` - исходные данные, список песен
    const songsReducer = () =>{
        return [
            { title: 'No Scrubs', duration: '4:05'},
            { title: 'Macarena', duration: '2:30'},
            { title: 'All Star', duration: '3:15'}
        ]
    };

    // `selectedSongReducer` - возвращает полезную нагрузку (информорцию про объект)
    // возможные варианты `action.type` берутся из `src/actions/index.js`
    const selectedSongReducer = (selectedSong=null, action) => {
        if( action.type ==='SONG_SELECTED'){
            return action.payload;
        }
        
        return selectedSong;
    };

    // обязательно в каждом проекте!!!
    export default combineReducers({
        songs: songsReducer,
        selectedSong: selectedSongReducer
    });


7. Add to `src/reducers/index.js`: // обязательно в каждом проекте!!!
    // импортируем Redux-библиотеку в файл
    // `combineReducers` Это метод, который позволяет вместо создания одного огромного reducer для всего состояния приложения сразу,// разбивать его на отдельные модули.
    import { combineReducers } from 'redux';
    ...
    export default combineReducers({ 
        //содержимое - в зависимости от созданных const's
        songs: songsReducer,
        selectedSong: selectedSongReducer
    });

8. Add to `src/index.js`: // обязательно в каждом проекте!!!
    import { Provider } from 'react-redux';
    import { createStore } from 'redux';
    import reducers from './reducers';

9. Edit `src/index.js`: // обязательно в каждом проекте!!!
    // новый код. `store` - состояния объектов, созданных в разных reducers (методах)
    ReactDOM.render(
        <Provider store={createStore(reducers)}>
            <App />
        </Provider>, 
        document.querySelector("#root")
    );

# STEP 4 (work with react side conponents): 
10. Create `src/scss/SongList.scss`, `src/components/SongList.js`
    // синтаксис одинаковый для различных приложений
    // обязательно в каждом проекте!!!
    import React, { Component } from 'react';
    import './scss/SongList.scss';

    class SongList extends Component{
        render(){
            return( //название разное для разных приложений
                <div>
                    SongList
                </div>
            );
        }
    }
    export default SongList;

11. Edit `src/App.js`
    // импортируем компонент
    import SongList from './SongList';
    ...
    // вставляем компонент в App-return
        <div>
            <SongList />
        </div>

12. Edit created component (e.g. SongList)
    // импортируем компонент `connect`
    // обязательно в каждом проекте!!!
    import { connect } from 'react-redux';

    // меняем текст
    // вместо
    export default SongList;
    // записываем 

    // в `src/reducers/index.js` описаны состояния объектов, которые записываются в `combineReducers` в виде `ключ:значение`.
    // `state` - полный список состояний
    // возвращаемое значение `return {songs: state.songs};`:
                                        //  `state.songs` - значение состояния по ключу из `combineReducers`
                                        //  `songs:`      - новый ключ, передаваемый в `export default connect(mapStateToProps,...`
                                        // и из него в компонент `class SongList extends Component{...` как
                                        // `this.props.songs`

    const mapStateToProps = (state) => {
        console.log("SongList->mapStateToProps: ",state);
        return {songs: state.songs};
    }
    
    export default connect(mapStateToProps)(SongList);

13.  Edit created component (e.g. SongList)
    // добавляем вспомогательную функцию `renderList`:
    renderList(){
        return this.props.songs.map((song, index)=>{
            return(
                <div className="item" key={index}>
                    <div className="right floated content">
                        <button 
                            className="ui primary button"
                            onClick={() => this.props.selectSong(song)}    
                        >
                            Select
                        </button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            );
        });
    }
    // и меняем `<div>SongList</div>` на `<div>{this.renderList()}</div>`

14. Change `src/App.js`
    // add css

15. Add to `src/component/SongList.js`:
    // меняем состояние `state` объекта (`selectedSong`) в `redux store`
    // каждый раз, когда мы хотим изменить данные с помощью `redux`, 
    // мы должны вызывать `action creator` !!!
    // т.е. функция `selectedSongReducer` `src/reducers/index.js` выбирает из `src/actions/index.js` (`selectSong` )
    // `type` и возвращает `payload`

    import { selectSong } from '../actions'; // `selectSong` - функция из `src/actions/index.js`
    
16. Add to `src/component/SongList.js`:
    // второй аргумент в `connect`- функцию добавляется объект
    // ключ -  как и название `action creator`
    // значение - название `action creator`, который мы импортировали:

    export default connect(mapStateToProps, `{selectSong : selectSong}`)(SongList);

17. Edit `src/component/SongList.js`:
    //навешиваем действие на кнопку
    // selectSong - `action creator`
    // после нажатия на кнопку - меняем `state` внутри нашего `store`
        <button 
            className="ui primary button"
            onClick={() => this.props.selectSong(song)}    
        >
            Select
        </button>

18. Edit `SongDetail Component` (`src/component/SongDetail.js`):
    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    import './scss/SongDetail.scss';
    const SongDetail=() =>{
        return(
            <div>SongDetail</div>
        );
    }
    export default SongDetail;

19. Edit `SongDetail Component` (`src/component/SongDetail.js`):
    
    // `state` - берется из `src/reducers/index.js` - `combineReducers()`
    
    // add function `mapStateToProps`
    const mapStateToProps = (state) => {
        console.log("SongDetail->mapStateToProps: ",state);
        return {song: state.selectedSong};  //key - может быть любым. Его используем как аргумент в `const SongDetail=({song}){...}`
    }

20. Edit `SongDetail Component` (`src/component/SongDetail.js`):
    // добавляем функцию `mapStateToProps` в `connect`
    export default connect(mapStateToProps)(SongDetail);

21. Change `src/App.js`
    // add `SongDetail `
    import SongDetail from './SongDetail';
    ...
    <div><SongDetail /></div>

22. Edit `SongDetail Component` (`src/component/SongDetail.js`):
    // если песня не выбрана, то `SongDetail()` - не имеет аргумента,и, как следствие, не может
    // вернуть `{song.title}`,`{song.duration}`
    // делаем заглушку
    if (!song){ return  <div>Select a song...</div>}

23. Change `SongDetail Component` (`src/component/SongDetail.js`):
    // add css


## ####################################################################################################
## ####################################################################################################
Integrating React with Redux
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
