export const dummyAdsPrerollXml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <vmap:VMAP xmlns="http://www.iab.net/videosuite/vmap" version="1.0">
            <vmap:AdBreak timeOffset="start" breakType="Linear" breakId="prerolls">
                <vmap:AdSource id="1" allowMultipleAds="true" followRedirects="true">
                    <vmap:VASTAdData>
                        <VAST version="2.0">
                            <Ad id="f86f2c27e1b74ba58d20521889cb8ab5">
                                <InLine>
                                    <AdSystem></AdSystem>
                                    <AdTitle></AdTitle>
                                    <Impression>
                                        <![CDATA[https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/post-event?params=eyJsb2dfaWQiOiIiLCJhZF9pZCI6ImZiYmYzMTA0OWNhYzExZTk5OWJhNDIwMTBhZGMwMDY0IiwiY2FtcGFpZ25fY3JpdGVyaWFfaWQiOiJiOThlYTYzMWY0MDE0MDI4YjViNmNkNWM0YjNlNjQ3ZSIsInZpZGVvX2lkIjoidmQxNTUzMzQ0MiIsInNlc3Npb25faWQiOiJpc3RtN2M5OWNrYWFycWhwNjFubGtyZ3h3amoyd2ciLCJ1c2VyX2lkIjoidFhYUldQMmdoaGFjRk4xVUd1VkNtWTFyVkRHSHdxIiwiZXZlbnRfdHlwZSI6MCwiY2FtcGFpZ25fdHlwZSI6IjEiLCJ2aWRlb190eXBlIjoxLCJhbW91bnQiOjEwMDAsImFnZSI6Ilx1MDAzY24vYVx1MDAzZSIsImdlbmRlciI6Ilx1MDAzY24vYVx1MDAzZSIsImNvdW50cnlfaWQiOiJJRCIsImFkbWluaXN0cmF0aXZlX2xldmVsXzJfaWQiOiJcdTAwM2NuL2FcdTAwM2UiLCJhcHBfaWQiOiJzZW50X2FkcyIsInByb2plY3RfaWQiOiI1IiwidGltZXN0YW1wIjoiMjAxOS0wNy0xMVQxNTo0Njo1OS4yOTA2OTYrMDc6MDAiLCJkZWxldGVkX2F0IjoiMDAwMS0wMS0wMVQwMDowMDowMFoifQ==]]>
                                    </Impression>
                                    <Creatives>
                                        <Creative>
                                            <Linear>
                                                <Duration>00:00:15</Duration>
                                                <TrackingEvents></TrackingEvents>
                                                <MediaFiles>
                                                    <MediaFile id="f86f2c27e1b74ba58d20521889cb8ab5" delivery="streaming" type="video/mp4" width="1280" height="720" scalable="true" maintainAspectRatio="true">
                                                        <![CDATA[https://cdn.stag.supersoccer.tv/sstv-web/video/e4822b25-9c94-4642-b29b-e907e46744ef/video.mp4?hdnts=st=1562832809~exp=1562836409~acl=/*~hmac=f0332c90b1217db4e9b5faf5faa2de3caeeb6b736287a8f5fce3bc8c957af36a]]>
                                                    </MediaFile>
                                                </MediaFiles>
                                            </Linear>
                                        </Creative>
                                    </Creatives>
                                    <Description></Description>
                                    <Survey></Survey>
                                </InLine>
                            </Ad>
                        </VAST>
                    </vmap:VASTAdData>
                </vmap:AdSource>
                <vmap:TrackingEvents></vmap:TrackingEvents>
            </vmap:AdBreak>
            <vmap:AdBreak timeOffset="00:01:40" breakType="Linear" breakId="midrolls">
                <vmap:AdSource id="2" allowMultipleAds="true" followRedirects="true">
                    <vmap:VASTAdData>
                        <VAST version="2.0">
                            <Ad id="wkwka77d02d44af8adb461b4aea0a5kk">
                                <InLine>
                                    <AdSystem></AdSystem>
                                    <AdTitle></AdTitle>
                                    <Impression>
                                        <![CDATA[https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/post-event?params=eyJsb2dfaWQiOiIiLCJhZF9pZCI6ImZiYmY5N2QxOWNhYzExZTk5OWJhNDIwMTBhZGMwMDY0IiwiY2FtcGFpZ25fY3JpdGVyaWFfaWQiOiJiN2U0ODZkZTAwNTg0NWVmYTkxZjY1OGUwMzU1ZjYwZSIsInZpZGVvX2lkIjoidmQxNTUzMzQ0MiIsInNlc3Npb25faWQiOiJpc3RtN2M5OWNrYWFycWhwNjFubGtyZ3h3amoyd2ciLCJ1c2VyX2lkIjoidFhYUldQMmdoaGFjRk4xVUd1VkNtWTFyVkRHSHdxIiwiZXZlbnRfdHlwZSI6MCwiY2FtcGFpZ25fdHlwZSI6IjIiLCJ2aWRlb190eXBlIjoxLCJhbW91bnQiOjEwLCJhZ2UiOiJcdTAwM2NuL2FcdTAwM2UiLCJnZW5kZXIiOiJcdTAwM2NuL2FcdTAwM2UiLCJjb3VudHJ5X2lkIjoiSUQiLCJhZG1pbmlzdHJhdGl2ZV9sZXZlbF8yX2lkIjoiXHUwMDNjbi9hXHUwMDNlIiwiYXBwX2lkIjoic2VudF9hZHMiLCJwcm9qZWN0X2lkIjoiNSIsInRpbWVzdGFtcCI6IjIwMTktMDctMTFUMTU6NDY6NTkuODUzMzU0KzA3OjAwIiwiZGVsZXRlZF9hdCI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIn0=]]>
                                    </Impression>
                                    <Creatives>
                                        <Creative>
                                            <Linear>
                                                <Duration>00:00:15</Duration>
                                                <TrackingEvents></TrackingEvents>
                                                <MediaFiles>
                                                    <MediaFile id="wkwka77d02d44af8adb461b4aea0a5kk" delivery="streaming" type="video/mp4" width="1280" height="720" scalable="true" maintainAspectRatio="true">
                                                        <![CDATA[https://cdn.stag.supersoccer.tv/sstv-web/video/1bf6a892-a918-4025-836b-1fe2c0b05b82/video.mp4?hdnts=st=1562832809~exp=1562836409~acl=/*~hmac=f0332c90b1217db4e9b5faf5faa2de3caeeb6b736287a8f5fce3bc8c957af36a]]>
                                                    </MediaFile>
                                                </MediaFiles>
                                            </Linear>
                                        </Creative>
                                    </Creatives>
                                    <Description></Description>
                                    <Survey></Survey>
                                </InLine>
                            </Ad>
                        </VAST>
                    </vmap:VASTAdData>
                </vmap:AdSource>
                <vmap:TrackingEvents></vmap:TrackingEvents>
            </vmap:AdBreak>
            <vmap:AdBreak timeOffset="00:21:40" breakType="Linear" breakId="midrolls">
                <vmap:AdSource id="2" allowMultipleAds="true" followRedirects="true">
                    <vmap:VASTAdData>
                        <VAST version="2.0">
                            <Ad id="0d2da77d02d44af8adb461b4aea0a522">
                                <InLine>
                                    <AdSystem></AdSystem>
                                    <AdTitle></AdTitle>
                                    <Impression>
                                        <![CDATA[https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/post-event?params=eyJsb2dfaWQiOiIiLCJhZF9pZCI6ImZiYmY5N2QxOWNhYzExZTk5OWJhNDIwMTBhZGMwMDY0IiwiY2FtcGFpZ25fY3JpdGVyaWFfaWQiOiJiN2U0ODZkZTAwNTg0NWVmYTkxZjY1OGUwMzU1ZjYwZSIsInZpZGVvX2lkIjoidmQxNTUzMzQ0MiIsInNlc3Npb25faWQiOiJpc3RtN2M5OWNrYWFycWhwNjFubGtyZ3h3amoyd2ciLCJ1c2VyX2lkIjoidFhYUldQMmdoaGFjRk4xVUd1VkNtWTFyVkRHSHdxIiwiZXZlbnRfdHlwZSI6MCwiY2FtcGFpZ25fdHlwZSI6IjIiLCJ2aWRlb190eXBlIjoxLCJhbW91bnQiOjEwLCJhZ2UiOiJcdTAwM2NuL2FcdTAwM2UiLCJnZW5kZXIiOiJcdTAwM2NuL2FcdTAwM2UiLCJjb3VudHJ5X2lkIjoiSUQiLCJhZG1pbmlzdHJhdGl2ZV9sZXZlbF8yX2lkIjoiXHUwMDNjbi9hXHUwMDNlIiwiYXBwX2lkIjoic2VudF9hZHMiLCJwcm9qZWN0X2lkIjoiNSIsInRpbWVzdGFtcCI6IjIwMTktMDctMTFUMTU6NDY6NTkuODUzMzU0KzA3OjAwIiwiZGVsZXRlZF9hdCI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIn0=]]>
                                    </Impression>
                                    <Creatives>
                                        <Creative>
                                            <Linear>
                                                <Duration>00:00:15</Duration>
                                                <TrackingEvents></TrackingEvents>
                                                <MediaFiles>
                                                    <MediaFile id="0d2da77d02d44af8adb461b4aea0a522" delivery="streaming" type="video/mp4" width="1280" height="720" scalable="true" maintainAspectRatio="true">
                                                        <![CDATA[https://cdn.stag.supersoccer.tv/sstv-web/video/1bf6a892-a918-4025-836b-1fe2c0b05b82/video.mp4?hdnts=st=1562832809~exp=1562836409~acl=/*~hmac=f0332c90b1217db4e9b5faf5faa2de3caeeb6b736287a8f5fce3bc8c957af36a]]>
                                                    </MediaFile>
                                                </MediaFiles>
                                            </Linear>
                                        </Creative>
                                    </Creatives>
                                    <Description></Description>
                                    <Survey></Survey>
                                </InLine>
                            </Ad>
                        </VAST>
                    </vmap:VASTAdData>
                </vmap:AdSource>
                <vmap:TrackingEvents></vmap:TrackingEvents>
            </vmap:AdBreak>
        </vmap:VMAP>`;
