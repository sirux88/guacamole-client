/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * A service for providing fullscreen support.
 */
angular.module('client').factory('guacFullscreen', ['$injector',

    
    function guacFullscreen($injector) {
        
        var service = {};

        service.toggleFullscreenMode = function toggleFullscreenMode(){
            if(!service.isInFullscreenMode()){
                service.setFullscreenMode(true);
            }else{
                service.setFullscreenMode(false);
            }
        }

        service.isInFullscreenMode=function isInFullscreenMode(){
            return document.fullscreenElement;
        }

        service.setFullscreenMode = function setFullscreenMode(state) {
            if(document.fullscreenEnabled){
                if(state && !service.isInFullscreenMode()) document.documentElement.requestFullscreen(); 
                else if(!state && service.isInFullscreenMode()) document.exitFullscreen(); 
            }
        }

        document.addEventListener('fullscreenchange', () => {
            
            if (navigator.keyboard){
                if(service.isInFullscreenMode()){
                    navigator.keyboard.lock();   
                }else{
                    navigator.keyboard.unlock();
                }
            }
        })

        return service;
    } 
])