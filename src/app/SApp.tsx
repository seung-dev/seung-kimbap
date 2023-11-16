import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { ErrorComponent, RefineSnackbarProvider, ThemedLayoutV2, ThemedTitleV2, notificationProvider } from "@refinedev/mui";
import routerBindings, { CatchAllNavigate, DocumentTitleHandler, NavigateToResource } from "@refinedev/react-router-v6";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import { Header } from "@/components/header";
import { SAuthP, SAxios, SDataP, SDefaultP, SThemeP, STranslationP } from "@/config";
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from "@/pages/blog-posts";
import { ForgotPassword } from "@/pages/forgotPassword";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";

import { AppLogoV } from "@app/public";

import { s_default } from "./SDefault";
import { s_nav } from "./SRoutes";

function SApp() {
	const run_mode = import.meta.env.MODE;
	const base_url = import.meta.env.BASE_URL;
	const app_name = import.meta.env.VITE_APP_NAME;
	const proxy_url = import.meta.env.VITE_PROXY_URL;
	const storage_profile_name = import.meta.env.VITE_STORAGE_PROFILE_NAME;
	const signin_path = import.meta.env.VITE_SIGNIN_PATH;

	const { t: translate, i18n } = useTranslation();

	return (
		<BrowserRouter>
			<RefineKbarProvider>
				<SDefaultP value={s_default}>
					<SThemeP>
						<CssBaseline />
						<GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
						<RefineSnackbarProvider>
							<DevtoolsProvider>
								<Refine
									notificationProvider={notificationProvider}
									i18nProvider={STranslationP(translate, i18n)}
									options={{
										projectId: app_name,
										syncWithLocation: true,
										// warnWhenUnsavedChanges: true,
										// useNewQueryKeys: true,
										reactQuery: {
											clientConfig: {
												defaultOptions: {
													queries: {
														retry: 0,
														refetchOnWindowFocus: false,
														keepPreviousData: false,
													},
													mutations: {
														retry: 0,
													},
												},
											},
										},
									}}
									routerProvider={routerBindings}
									dataProvider={SDataP({
										host: proxy_url,
										http_client: SAxios,
									})}
									authProvider={SAuthP({
										translate: translate,
										http_client: SAxios,
										signin_path: signin_path,
										storage_profile_name: storage_profile_name,
									})}
									resources={s_nav}
								>
									<DocumentTitleHandler />
									<RefineKbar />
									<Routes>
										<Route
											element={
												<Authenticated
													key="authenticated-inner"
													fallback={<CatchAllNavigate to="/login" />}
												>
													<ThemedLayoutV2
														Header={() => <Header sticky />}
														Title={({ collapsed }) => (
															<ThemedTitleV2
																collapsed={collapsed}
																text="refine Project"
																icon={<AppLogoV />}
															/>
														)}
													>
														<Outlet />
													</ThemedLayoutV2>
												</Authenticated>
											}
										>
											<Route index element={<NavigateToResource resource="blog_posts" />} />
											<Route path="/blog-posts">
												<Route index element={<BlogPostList />} />
												<Route path="create" element={<BlogPostCreate />} />
												<Route path="edit/:id" element={<BlogPostEdit />} />
												<Route path="show/:id" element={<BlogPostShow />} />
											</Route>
											<Route path="*" element={<ErrorComponent />} />
										</Route>
										<Route
											element={
												<Authenticated key="authenticated-outer" fallback={<Outlet />}>
													<NavigateToResource />
												</Authenticated>
											}
										>
											<Route path="/login" element={<Login />} />
											<Route path="/register" element={<Register />} />
											<Route path="/forgot-password" element={<ForgotPassword />} />
										</Route>
									</Routes>
								</Refine>
							</DevtoolsProvider>
						</RefineSnackbarProvider>
					</SThemeP>
				</SDefaultP>
			</RefineKbarProvider>
		</BrowserRouter>
	);
}

export default SApp;
